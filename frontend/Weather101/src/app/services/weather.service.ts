import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * {@link WeatherService} is an injectable service 
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  /**
   * The weather proxy url
   */
  readonly baseWeatherUrl = "/weather";

  /**
   * Constructor
   * @param http The {@link HttpClient} use to make backend calls
   */
  constructor(private http: HttpClient) { }

  /**
   * Get a 2.5 km radius forecast for the provided latitude longitude
   * @param lat the latitude
   * @param lon the longitude
   */
  latLon12HourWeatherForcast(lat: number, lon: number) {
    return this.http.get(`${this.baseWeatherUrl}/gridpoints/TOP/${lat},${lon}/forecast`);
  }
}
