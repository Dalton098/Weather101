import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

export interface Alert {
  severity: string,
  description: string,
  startTime: string
};

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements AfterViewInit {
  alerts: Alert[] = [];
  displayedColumns: string[] = ['severityColor', 'severity', 'description', 'startTime'];

  constructor(private weatherService: WeatherService,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.weatherService.activeAlerts(this.weatherService.getStoredLocation()).subscribe(data => {
      this.alerts = data.features.map((feature: { properties: { severity: any; headline: any; effective: any; }; }) => {
        return {
          severity: feature.properties.severity,
          description: feature.properties.headline,
          startTime: feature.properties.effective
        }
      });
    });
    this.changeDetectorRef.detectChanges();
  }

  getSeverityClass(alert: Alert) {
    return alert.severity.toLocaleLowerCase();
  }

}
