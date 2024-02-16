import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

/**
 * Test {@link WeatherService}
 */
describe('WeatherService', () => {
  /**
   * The {@link WeatherService} under test
   */
  let service: WeatherService;

  /**
   * The injected {@link HttpClient}
   */
  let httpClient: HttpClient;

  /**
   * The mock httpClient
   */
  let httpClientSpy: any;

  /**
   * Setup for the test
   */
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {}}));
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(WeatherService);
    httpClient = TestBed.inject(HttpClient);
  });

  /**
   * Test the service can be created
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test {@link WeatherService#latLon12HourWeatherForcast}
   */
  it('can get 12 hour data', () => {
    httpClient.get("/weather").subscribe(data => expect(data).toBeDefined());
    service.latLon12HourWeatherForcast(40, 75);
  });
});
