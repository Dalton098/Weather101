import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherService } from '../../services/weather.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import * as theSauce from "./testData.json";
import { DailyComponent } from './daily.component';

describe('HourlyComponent', () => {

  /**
   * The hourlyComponent
   */
  let component: DailyComponent;

  /**
   * The component being tested
   */
  let fixture: ComponentFixture<DailyComponent>;

  /**
   * Setup for the test
   */
  beforeEach(async () => {
    let weatherServiceSpy = jasmine.createSpyObj("WeatherService", ["latLonHourlyWeatherForcast"]);
    weatherServiceSpy.latLonHourlyWeatherForcast.and.returnValue(of(theSauce));
    await TestBed.configureTestingModule({
      declarations: [DailyComponent],
      imports: [
        MatTableModule
      ],
      providers: [{provide: WeatherService, useValue: weatherServiceSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test {@link HourlyComponent}
   */
  it('should create', async () => {
    expect(component).toBeTruthy();
    await setTimeout(() => {}, 5000);
    fixture.detectChanges();
  });
});
