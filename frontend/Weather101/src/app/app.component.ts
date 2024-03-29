import { Component, ViewEncapsulation } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Location } from './common/Location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Weather 101';
  currentRoute = "";
  searchText = "";
  search = 19355
  navLinks = [
    { link: '/daily', label: "Today"},
    { link: '/hourly', label: "Hourly"},
    { link: '/weekly', label: "Weekly"},
    { link: '/monthly', label: 'Monthly'}
  ];

  constructor(private weatherService: WeatherService) {
    this.searchText = this.weatherService.getStoredLocation().zip;
  }

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }

  async storeLocation() {
    console.log(this.searchText);
    const location = await this.weatherService.fetchLocation(this.searchText as any);
    if (location) {
      this.weatherService.setStoredLocation(location);
    }
  }
}
