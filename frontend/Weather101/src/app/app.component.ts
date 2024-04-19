import { Component, ViewEncapsulation } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertsComponent } from './components/alerts/alerts.component';

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

  constructor(private weatherService: WeatherService,
              private dialog: MatDialog) {
    this.searchText = this.weatherService.getStoredLocation().zip;
  }

  activeAlerts() {
    this.weatherService.activeAlerts(this.weatherService.getStoredLocation()).subscribe(data => {
      console.log(data);
    });
  }

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }

  openAlerts() {
    this.dialog.open(AlertsComponent, {
      height: '800px',
      width: '1000px'
    });
  }

  async storeLocation() {
    console.log(this.searchText);
    const location = await this.weatherService.fetchLocation(this.searchText as any);
    if (location) {
      this.weatherService.setStoredLocation(location);
    }
  }
}
