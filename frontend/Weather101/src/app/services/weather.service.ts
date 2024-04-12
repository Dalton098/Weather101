import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  public static readonly TWELVE_HOUR_KEY = "12HourForecast";
  public static readonly HOURLY_KEY = "hourlyForecast";

  private officeCache: Map<string, any> = new Map();

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
    const office = this.getStoredLocation().office || { office: 'TOP', x: 45, y: 77};
    return this._getDataFromApiOrCache(
      `${this.baseWeatherUrl}/gridpoints/${office.office}/${office.x},${office.y}/forecast`,
      lat, lon, WeatherService.TWELVE_HOUR_KEY
    );
  }

  /**
   * Get a 2.5 km radius hourly forecast for the provided latitude longitude
   * @param lat the latitude
   * @param lon the longitude
   * 
   * @returns hourly forecast data
   */
  latLonHourlyWeatherForcast(lat: number, lon: number) : Observable<any> {
    const office = this.getStoredLocation().office || { office: 'TOP', x: 45, y: 77};
    return this._getDataFromApiOrCache(
      `${this.baseWeatherUrl}/gridpoints/${office.office}/${office.x},${office.y}/forecast/hourly`,
      lat, lon, WeatherService.HOURLY_KEY
      );
  }

  /**
   * Utility function to look up data from a cache, otherwise reach out
   * @param url The url to hit
   * @param lat The latitude
   * @param lon The longitude
   * @param key The unique key to identify the cache
   * @returns The data
   */
  private _getDataFromApiOrCache(url: string, lat: number, lon: number, key: string)  {
    lat = Math.abs(Number.parseInt(`${lat}`));
    lon = Math.abs(Number.parseInt(`${lon}`));
    const latLonKey = `${lat},${lon},${key}`;
    let returnData;
    if (this.officeCache.has("TOP")) {
      const allOfficeData = this.officeCache.get("TOP");
      returnData = allOfficeData[latLonKey] 
      ? of(allOfficeData[latLonKey])
      : this.http.get(url);
    } else {
      returnData = this.http.get(url);
    }
    return returnData;
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
    return location ? JSON.parse(location) : {"zip":"19355","latitude":40,"longitude":75,"city":"Malvern","state":"PA","country":"US"};
  }

  async setStoredLocation(location: Location) : Promise<void> {
    localStorage.setItem('location', JSON.stringify(location));
    this.zipCodeEventEmitter.emit(location);
  }

  /**
   * Save off the office data into the cache
   * @param officeId The office ID
   * @param lat The latitude
   * @param lon The longitude
   */
  setOfficeLocation(officeId: string, lat: number, lon: number, key: string, data: any) {
    lat = Math.abs(Number.parseInt(`${lat}`));
    lon = Math.abs(Number.parseInt(`${lon}`));
    let prevOffData = this.officeCache.get(officeId);
    const latLonKey = `${lat},${lon},${key}`;
    type objTemp = {
      [latLonKey: string]: any
    };
    const obj: objTemp = {};
    obj[latLonKey] = data;
    prevOffData = prevOffData ? Object.assign(prevOffData, obj) : obj;
    this.officeCache.set(officeId, prevOffData);
  }
}
