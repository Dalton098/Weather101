import { AfterViewInit, Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Section {
  name: string;
  updated: Date;
}

export interface HourlyForecast {
  humidity: number;
  shortForecast: string;
  startTime: Date;
  endTime: Date;
  temperature: number;
  windDirection: string;
  windSpeed: string;
}

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrl: './hourly.component.scss'
})
export class HourlyComponent implements AfterViewInit {

  public hourlyForecasts:HourlyForecast[] = [];
  public todaysDate:Date = new Date();

  displayedColumns: string [] = ['Time', 'Temperature', 'Forecast', 'Humidity', 'Wind']
  dataSource = new MatTableDataSource<HourlyForecast>(this.hourlyForecasts);

  constructor (private weatherService: WeatherService)
  {
  }


  ngAfterViewInit(): void {
    this.weatherService.latLonHourlyWeatherForcast(40, 75).subscribe(forecast => 
      {
        console.log(forecast);
        for (let period of forecast.properties.periods)
        {
          const hourlyForecast:HourlyForecast =
          {
            humidity: period.relativeHumidity.value,
            shortForecast: period.shortForecast,
            startTime: new Date(period.startTime),
            endTime: new Date(period.endTime),
            temperature: period.temperature,
            windDirection: period.windDirection,
            windSpeed: period.windSpeed
          }

          this.hourlyForecasts.push(hourlyForecast);
        }
        // this.todaysDate.getDay();
        this.hourlyForecasts = this.hourlyForecasts.filter(forecastItem => this.todaysDate.getDay() === forecastItem.startTime.getDay() );
        this.dataSource.data = this.hourlyForecasts.sort((firstItem, secondItem) => { return firstItem.startTime.getTime() - secondItem.startTime.getTime()});
      });
  }


  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
}
