import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WeatherService } from '../../services/weather.service';
import { getTranslation } from '../../icon-mapping';
import { DailyForecast } from '../../common/Forecast';
import { DailyComponent } from '../daily/daily.component';

/**
 * {@link WeeklyComponent} is a component that will display the weather data on a weekly basis
 */
@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.scss'
})
export class WeeklyComponent implements AfterViewInit {

  /**
   * The forecast data
   */
  private _weeklyForecast: DailyForecast[] = [];

  /**
   * Todays {@link DailyForecast}
   */
  private _todaysForecast: DailyForecast;

  /**
   * Todays date
   */
  private _todaysDate: Date = new Date();

  /**
   * The name of the columns to display
   */
  private _displayedColumns: string[] = ['Day', 'Temperature', 'Forecast', 'Humidity', 'Wind'];

  /**
   * The data source for the weekly forecast data
   */
  private _dataSource = new MatTableDataSource<DailyForecast>(this._weeklyForecast);

  /**
   * Constructor
   * @param weatherService The {@link WeatherService} to lookup weather data
   * @param changeDetectorRef The {@link ChangeDetectorRef} to detect changes in the weather data
   */
  constructor(private weatherService: WeatherService,
              private changeDetectorRef: ChangeDetectorRef) { }

  /**
   * Initialize the forecast
   */
  ngAfterViewInit(): void {
    this.weatherService.latLon12HourWeatherForcast(40, 75).subscribe(forecast => 
      {
        const days: DailyForecast[] = [];
        const periods = forecast.properties.periods;
        for (let i = 0; i < periods.length; i += 2) {
          days.push(DailyComponent.averageForecast(periods.slice(i, i + 2)));
        }

        for (let period of days)
        {
          const hourlyForecast:DailyForecast =
          {
            humidity: period.relativeHumidity!.value,
            day: period.name,
            icon: getTranslation(period.shortForecast),
            shortForecast: period.shortForecast,
            startTime: new Date(period.startTime),
            endTime: new Date(period.endTime),
            temperature: period.temperature,
            windDirection: period.windDirection,
            windSpeed: period.windSpeed
          }

          this._weeklyForecast.push(hourlyForecast);
        }

        this._todaysForecast = this._weeklyForecast[0];
        this._dataSource.data = this._weeklyForecast
                                    .splice(1)
                                    .sort((firstItem, secondItem) => { return firstItem.startTime.getTime() - secondItem.startTime.getTime()});
        this.changeDetectorRef.detectChanges();
      });
  }
  
  /**
   * @returns Todays date
   */
  public get todaysDate(): Date {
    return this._todaysDate;
  }

  /**
   * @returns The name of the columns to display
   */
  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  /**
   * @returns The data source for the weekly forecast data
   */
  public get dataSource() {
    return this._dataSource;
  }

  /**
   * @returns todays {@link DailyForecast}
   */
  public get todaysForecast(): DailyForecast {
    return this._todaysForecast;
  }
}

