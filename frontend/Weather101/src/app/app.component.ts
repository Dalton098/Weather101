import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Weather 101';
  currentRoute = "";
  searchBarValue = "";
  navLinks = [
    { link: '/daily', label: "Today"},
    { link: '/hourly', label: "Hourly"},
    { link: '/weekly', label: "Weekly"},
    { link: '/monthly', label: 'Monthly'}
  ];

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }

}
