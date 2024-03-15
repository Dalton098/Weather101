import { ComponentFixture, TestBed } from '@angular/core/testing';

import * as theSauce from "./testData.json";
import { WeeklyComponent } from './weekly.component';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { WeatherService } from '../../services/weather.service';

describe('WeeklyComponent', () => {

  /**
   * The weekly component
   */
  let component: WeeklyComponent;
  let fixture: ComponentFixture<WeeklyComponent>;

  beforeEach(async () => {
    let weatherServiceSpy = jasmine.createSpyObj("WeatherService", ["latLon12HourWeatherForcast"]);
    weatherServiceSpy.latLon12HourWeatherForcast.and.returnValue(of(theSauce));
    await TestBed.configureTestingModule({
      declarations: [WeeklyComponent],
      imports: [MatTableModule, MatCardModule],
      providers: [{provide: WeatherService, useValue: weatherServiceSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
    await setTimeout(() => {}, 5000);
    expect(component.dataSource).toBeDefined();
    expect(component.todaysDate).toBeDefined();
    expect(component.todaysForecast).toBeDefined();
    expect(component.displayedColumns).toBeDefined();
  });
});
