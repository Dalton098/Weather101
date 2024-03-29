import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { getTranslation } from '../../icon-mapping';
import { DailyForecast } from '../../common/Forecast';

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
        
        this.averageWeather = DailyComponent.averageForecast(forecasts);
        // just split evenly for quarters, its wrong but no one cares
        let cursor = 0;
        this.morningWeatherAverage = DailyComponent.averageForecast(forecasts.slice(cursor, cursor +  forecasts.length / 4));
        cursor += forecasts.length / 4;
        this.afternoonWeatherAverage = DailyComponent.averageForecast(forecasts.slice(cursor,  cursor + forecasts.length / 4));
        cursor += forecasts.length / 4;
        this.eveningWeatherAverage = DailyComponent.averageForecast(forecasts.slice(cursor, cursor +  forecasts.length / 4));
        cursor += forecasts.length / 4;
        this.overnightWeatherAverage = DailyComponent.averageForecast(forecasts.slice(cursor, cursor + forecasts.length / 4));
        cursor += forecasts.length / 4;

        this.dayAverage = Math.round((this.morningWeatherAverage.temperature + this.afternoonWeatherAverage.temperature) / 2);
        this.nightAverage = Math.round((this.eveningWeatherAverage.temperature + this.overnightWeatherAverage.temperature) / 2);
        this.averageWeather.icon = this.morningWeatherAverage.icon;
        this.changeDetectorRef.detectChanges();
      });
  }

  private periodToDailyForecast(period: any) : DailyForecast {
    let windspeed = period.windSpeed;
    if (windspeed) {
      windspeed = windspeed.split(' ')[0];
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

  public static averageForecast(periods: DailyForecast[]) : DailyForecast {
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
      name: periods[0].name,
      shortForecast: winningForecast,
      detailedForecast: winningForecast,
      probabilityOfPrecipitation: {
        unitCode: periods[0].probabilityOfPrecipitation!.unitCode,
        value: periods.map(period => period.probabilityOfPrecipitation!.value).reduce((a, b) => a + b) / periods.length
      },
      day: periods[0].name,
      startTime: new Date(periods[0].startTime),
      endTime: new Date(periods[0].endTime),
      isDaytime: periods[periods.length - 1].isDaytime,
      temperature: Math.round(periods.map(period => period.temperature).reduce((a, b) => a + b) / periods.length),
      temperatureUnit: periods[0].temperatureUnit,
      temperatureTrend: periods[0].temperatureTrend,
      dewpoint: {
        unitCode: periods[0].dewpoint!.unitCode,
        value: periods.map(period => period.dewpoint!.value).reduce((a, b) => a + b) / periods.length
      },
      relativeHumidity: {
        unitCode: periods[0].relativeHumidity!.unitCode,
        value: Math.round(periods.map(period => period.relativeHumidity!.value).reduce((a, b) => a + b) / periods.length)
      },
      windSpeed: periods[0].windSpeed,
      windDirection: Array.from(new Set(periods.map(period => period.windDirection))).join('/') as any,
      icon: getTranslation(winningForecast),
    }
  }
}
