import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatTableDataSource } from '@angular/material/table';
import { getTranslation } from '../../icon-mapping';
import { CalendarMonthViewBeforeRenderEvent, CalendarMonthViewDay } from 'angular-calendar';
import { DailyForecast } from '../../common/Forecast';
import { DailyComponent } from '../daily/daily.component';
import { Location } from '../../common/Location';

export interface MonthlyForecast {
  number:number;
  name:string;
  startTime: Date;
  endTime: Date;
  isDaytime:boolean;
  temperature:number;
  temperatureUnit: string;
  temperatureTrend: any;
  probabilityOfPrecipitation:{
      unitCode: string;
      value: number;
  },
  dewpoint:{
      unitCode:string;
      value: number;
  },
  relativeHumidity:{
      unitCode:string;
      value: number;
  },
  windSpeed: number;
  windDirection: 'N' | 'S' | 'E' | 'W' | 'NE' | 'SE' | 'NW' | 'SW'
  icon: string,
  shortForecast: string,
  detailedForecast: string
}

@Component({
  selector: 'app-daily',
  templateUrl: './monthly.component.html',
  styleUrl: './monthly.component.scss'
})
export class MonthlyComponent implements AfterViewInit {

  public todaysDate:Date = new Date();
  public dayAverage = 0;
  public nightAverage = 0;
  public location = "";
  private _monthlyForecast = {} as any;

  constructor (private weatherService: WeatherService, private changeDetectorRef: ChangeDetectorRef)
  {
  }

  renderPage(location: Location) {
    this.weatherService.latLon12HourWeatherForcast(location.latitude, location.longitude).subscribe(forecast => 
      {
        this.location = `${location.city}, ${location.state}`;
        const days: DailyForecast[] = [];
        const periods = forecast.properties.periods;
        for (let i = 0; i < periods.length; i += 2) {
          days.push(DailyComponent.averageForecast(periods.slice(i, i + 2)));
        }

        let knownDays = [];

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
          knownDays.push(hourlyForecast.startTime.getDay());
          this._monthlyForecast[hourlyForecast.startTime.getDay()] = hourlyForecast;
        }

        // Scramble
        for (let i = 0; i < 32; i++) {
          if (!this._monthlyForecast[i]) {
            const random = Math.floor(Math.random() * knownDays.length);
            this._monthlyForecast[i] = this._monthlyForecast[knownDays[random]];
          }
        }

        //jank engage
        var cells = Array.from(document.querySelectorAll('.cal-in-month'));
        for (let cell of cells) {
          let day = parseInt((cell as any).innerText);
          let html = cell.querySelector('span')?.innerHTML as string;
          html = html + `<span class="calendar-icon material-symbols-outlined forecast">${getTranslation(this._monthlyForecast[day].shortForecast)}</span><span class="calendar-text">${this._monthlyForecast[day].temperature}°</span>`;
          // rewrite html
          (cell as any).querySelector('span').innerHTML = html;
        }
      });
      this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.renderPage(this.weatherService.getStoredLocation());
    this.weatherService.zipCodeEventEmitter.subscribe((loc => { this.renderPage(loc)}));
  }
}
