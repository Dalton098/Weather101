import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../common/Location';

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

  public readonly zipCodeEventEmitter = new EventEmitter<Location>();

  /**
   * Constructor
   * @param http The {@link HttpClient} use to make backend calls
   */
  constructor(private http: HttpClient) { }

  /**
   * Get a 2.5 km radius forecast for the provided latitude longitude
   * @param lat the latitude
   * @param lon the longitude
   * 
   * @returns forecast data
   */
  latLon12HourWeatherForcast(lat: number, lon: number) : Observable<any> {
    lat = Math.abs(Number.parseInt(`${lat}`));
    lon = Math.abs(Number.parseInt(`${lon}`));
    return this.http.get(`${this.baseWeatherUrl}/gridpoints/TOP/${lat},${lon}/forecast`);
  }

  /**
   * Get a 2.5 km radius hourly forecast for the provided latitude longitude
   * @param lat the latitude
   * @param lon the longitude
   * 
   * @returns hourly forecast data
   */
  latLonHourlyWeatherForcast(lat: number, lon: number) : Observable<any> {
    lat = Math.abs(Number.parseInt(`${lat}`));
    lon = Math.abs(Number.parseInt(`${lon}`));
    return this.http.get(`${this.baseWeatherUrl}/gridpoints/TOP/${lat},${lon}/forecast/hourly`);
  }

  /**
   * Get Weather Alerts
   */
  activeAlerts(location: Location) : Observable<any> {
    const stateName = location.state;
    return this.http.get(`${this.baseWeatherUrl}/alerts/active/area/${stateName}`);
  }

  /**
   * Retrieves coordinates
   * @param zipCode the zip code
   * @returns coordinate location
   */
  async fetchLocation(zipCode: number): Promise<Location | undefined> {
    const location = await this.http.get<Location>(`/zipcode/${zipCode}`).toPromise();
    return location;
  }

  getStoredLocation() : Location {
    const location = localStorage.getItem('location')
    return location ? JSON.parse(location) : {"zip":"19355","latitude":40.0468,"longitude":-75.531,"city":"Malvern","state":"PA","country":"US"};
  }

  setStoredLocation(location: Location) : void {
    localStorage.setItem('location', JSON.stringify(location));
    this.zipCodeEventEmitter.emit(location);
  }
}
