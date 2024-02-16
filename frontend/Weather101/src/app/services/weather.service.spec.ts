import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can get 12 hour data', () => {
    httpClient.get("/weather").subscribe(data => expect(data).toBeDefined());
    const req = service.latLon12HourWeatherForcast(40, 75);

  });
});
