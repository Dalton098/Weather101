import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatTableDataSource } from '@angular/material/table';

export interface DailyForecast {
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
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss'
})
export class DailyComponent implements AfterViewInit {

  public todaysDate:Date = new Date();
  public dayAverage = 0;
  public nightAverage = 0;
  public location = "Malvern, PA";

  // overall weather
  public averageWeather: DailyForecast;

  // quarters
  public morningWeatherAverage: DailyForecast;
  public afternoonWeatherAverage: DailyForecast;
  public eveningWeatherAverage: DailyForecast;
  public overnightWeatherAverage: DailyForecast;

  constructor (private weatherService: WeatherService, private changeDetectorRef: ChangeDetectorRef)
  {
  }


  ngAfterViewInit(): void {
    this.weatherService.latLonHourlyWeatherForcast(40, 75).subscribe(forecast => 
      {
        const forecasts = forecast.properties.periods.map((period: any) => this.periodToDailyForecast(period))
          .filter((forecast: DailyForecast) => this.todaysDate.getDay() === forecast.startTime.getDay() );
        
        this.averageWeather = this.averageForecast(forecasts);
        // just split evenly for quarters, its wrong but no one cares
        let cursor = 0;
        this.morningWeatherAverage = this.averageForecast(forecasts.slice(cursor, cursor +  forecasts.length / 4));
        cursor += forecasts.length / 4;
        this.afternoonWeatherAverage = this.averageForecast(forecasts.slice(cursor,  cursor + forecasts.length / 4));
        cursor += forecasts.length / 4;
        this.eveningWeatherAverage = this.averageForecast(forecasts.slice(cursor, cursor +  forecasts.length / 4));
        cursor += forecasts.length / 4;
        this.overnightWeatherAverage = this.averageForecast(forecasts.slice(cursor, cursor + forecasts.length / 4));
        cursor += forecasts.length / 4;

        this.dayAverage = Math.round((this.morningWeatherAverage.temperature + this.afternoonWeatherAverage.temperature) / 2);
        this.nightAverage = Math.round((this.eveningWeatherAverage.temperature + this.overnightWeatherAverage.temperature) / 2);

        this.changeDetectorRef.detectChanges();
      });
  }

  private periodToDailyForecast(period: any) : DailyForecast {
    let windspeed = period.windSpeed || null;
    if (windspeed) {
      windspeed = windspeed.split(' ')[0] || '0';
      windspeed = parseInt(windspeed);
    }
    return {
      number: period.number,
      probabilityOfPrecipitation: period.probabilityOfPrecipitation,
      dewpoint: period.dewpoint,
      icon: period.icon,
      detailedForecast: period.detailedForecast,
      isDaytime: period.isDaytime,
      name: period.name,
      temperatureTrend: period.temperatureTrend,
      temperatureUnit: period.temperatureUnit,
      relativeHumidity: period.relativeHumidity,
      shortForecast: period.shortForecast,
      startTime: new Date(period.startTime),
      endTime: new Date(period.endTime),
      temperature: period.temperature,
      windDirection: period.windDirection,
      windSpeed: windspeed
    };
  }

  private averageForecast(periods: DailyForecast[]) : DailyForecast {
    let shortForecasts = new Set(periods.map(p => p.shortForecast));
    let winningForecast = 'No information';
    let winnerCount = 0;
    for(let forecast of shortForecasts) {
      const forecastCount = periods.filter(p => p.shortForecast == forecast).length;
      if (forecastCount > winnerCount) {
        winningForecast = forecast;
        winnerCount = forecastCount;
      }
    }

    return {
      number: -1,
      name: 'weather concat',
      shortForecast: winningForecast,
      detailedForecast: winningForecast,
      probabilityOfPrecipitation: {
        unitCode: periods[0].probabilityOfPrecipitation.unitCode,
        value: periods.map(period => period.probabilityOfPrecipitation.value).reduce((a, b) => a + b) / periods.length
      },
      startTime: new Date(),
      endTime: new Date(),
      isDaytime: periods[periods.length - 1].isDaytime,
      temperature: Math.round(periods.map(period => period.temperature).reduce((a, b) => a + b) / periods.length),
      temperatureUnit: periods[0].temperatureUnit,
      temperatureTrend: periods[0].temperatureTrend,
      dewpoint: {
        unitCode: periods[0].dewpoint.unitCode,
        value: periods.map(period => period.dewpoint.value).reduce((a, b) => a + b) / periods.length
      },
      relativeHumidity: {
        unitCode: periods[0].relativeHumidity.unitCode,
        value: periods.map(period => period.relativeHumidity.value).reduce((a, b) => a + b) / periods.length
      },
      windSpeed: periods.map(period => period.windSpeed).reduce((a, b) => a + b) / periods.length,
      windDirection: Array.from(new Set(periods.map(period => period.windDirection))).join('/') as any,
      icon: periods[periods.length - 1].icon,
    }
  }
}
