import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatTableDataSource } from '@angular/material/table';
import { getTranslation } from '../../icon-mapping';
import { DailyForecast } from '../../common/Forecast';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.scss'
})
export class HourlyComponent implements AfterViewInit {

  public hourlyForecasts:DailyForecast[] = [];
  public todaysDate:Date = new Date();

  displayedColumns: string [] = ['Time', 'Temperature', 'Forecast', 'Humidity', 'Wind']
  dataSource = new MatTableDataSource<DailyForecast>(this.hourlyForecasts);

  constructor (private weatherService: WeatherService, private changeDetectorRef: ChangeDetectorRef)
  {
  }


  ngAfterViewInit(): void {
    this.weatherService.latLonHourlyWeatherForcast(40, 75).subscribe(forecast => 
      {
        for (let period of forecast.properties.periods)
        {
          const hourlyForecast:DailyForecast =
          {
            humidity: period.relativeHumidity.value,
            icon: getTranslation(period.shortForecast),
            shortForecast: period.shortForecast,
            startTime: new Date(period.startTime),
            endTime: new Date(period.endTime),
            temperature: period.temperature,
            windDirection: period.windDirection,
            windSpeed: period.windSpeed
          }

          this.hourlyForecasts.push(hourlyForecast);
        }
        this.hourlyForecasts = this.hourlyForecasts.filter(forecastItem => this.todaysDate.getDay() === forecastItem.startTime.getDay() );
        this.dataSource.data = this.hourlyForecasts.sort((firstItem, secondItem) => { return firstItem.startTime.getTime() - secondItem.startTime.getTime()});
        this.changeDetectorRef.detectChanges();
      });
  }
}
