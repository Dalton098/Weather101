import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyComponent } from './hourly.component';
import { WeatherService } from '../../services/weather.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import * as theSauce from "./testData.json";

describe('HourlyComponent', () => {

  /**
   * The hourlyComponent
   */
  let component: HourlyComponent;

  /**
   * The component being tested
   */
  let fixture: ComponentFixture<HourlyComponent>;

  /**
   * Setup for the test
   */
  beforeEach(async () => {
    let weatherServiceSpy = jasmine.createSpyObj("WeatherService", ["latLonHourlyWeatherForcast"]);
    weatherServiceSpy.latLonHourlyWeatherForcast.and.returnValue(of(theSauce));
    await TestBed.configureTestingModule({
      declarations: [HourlyComponent],
      imports: [
        MatTableModule
      ],
      providers: [{provide: WeatherService, useValue: weatherServiceSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourlyComponent);
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
