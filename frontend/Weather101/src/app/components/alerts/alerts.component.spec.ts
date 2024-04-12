import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';
import { WeatherService } from '../../services/weather.service';
import weatherServiceSpy from '../../app.component.spec';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertsComponent],
      imports: [
        MatTableModule,
        MatIconModule
      ],
      providers: [{provide: WeatherService, useValue: weatherServiceSpy()}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
    await setTimeout(() => {}, 5000);
    fixture.detectChanges();
    expect(component.getSeverityClass({severity: 'Severe', description: '', startTime: ''})).toEqual('severe');
  });
});
