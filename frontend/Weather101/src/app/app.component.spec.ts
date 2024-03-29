import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { getTranslation } from './icon-mapping';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { of } from 'rxjs';
import * as hourlySauce from "./sampleData/hourlyWeatherData.json";
import * as twelveHourSauce from "./sampleData/twelveHourWeatherData.json";
import { WeatherService } from './services/weather.service';

export default function weatherServiceSpy() {
  let subscribeSpy = jasmine.createSpy("zipCodeEventEmitter subscribe");
  let weatherServiceSpy = jasmine.createSpyObj(
    "WeatherService", 
    [
      "latLon12HourWeatherForcast",
      "latLonHourlyWeatherForcast",
      "getStoredLocation",
      "fetchLocation"
    ],
    { zipCodeEventEmitter: {subscribe: subscribeSpy }});
  
  const tempLocation = {"zip":"19355","latitude":40.0468,"longitude":-75.531,"city":"Malvern","state":"PA","country":"US"};
  weatherServiceSpy.latLonHourlyWeatherForcast.and.returnValue(of(hourlySauce));
  weatherServiceSpy.latLon12HourWeatherForcast.and.returnValue(of(twelveHourSauce));
  weatherServiceSpy.getStoredLocation.and.returnValue(of(tempLocation));
  weatherServiceSpy.fetchLocation.and.returnValue(of(tempLocation));
  return weatherServiceSpy;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    spyOn(window.localStorage, 'setItem').and.callFake(() => {});
    const spy = weatherServiceSpy();
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: WeatherService, useValue: spy}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    app.setCurrentRoute("/newRoute");
    expect(app.currentRoute).toBe("/newRoute");
    app.storeLocation();
  });

  it ('should default icon', () => {
    expect(getTranslation("nonExistent")).toBe("sunny");
    
  });

});
