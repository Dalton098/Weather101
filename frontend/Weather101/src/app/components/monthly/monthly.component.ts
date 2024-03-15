import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatTableDataSource } from '@angular/material/table';
import { getTranslation } from '../../icon-mapping';
import { CalendarMonthViewBeforeRenderEvent, CalendarMonthViewDay } from 'angular-calendar';

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
  public location = "Malvern, PA";

  constructor (private weatherService: WeatherService, private changeDetectorRef: ChangeDetectorRef)
  {
  }

  ngAfterViewInit(): void {
    //jank engage
    var cells = Array.from(document.querySelectorAll('.cal-in-month'));
    for (let cell of cells) {
      let day = parseInt((cell as any).innerText);
      let html = cell.querySelector('span')?.innerHTML as string;
      html = html + '<div class="calendar-icon">Test Icon</div>';
      // rewrite html
      (cell as any).querySelector('span').innerHTML = html;
    }
  }
}
