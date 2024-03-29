import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherService } from '../../services/weather.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MonthlyComponent } from './monthly.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import weatherServiceSpy from '../../app.component.spec';

describe('MonthlyComponent', () => {

  /**
   * The hourlyComponent
   */
  let component: MonthlyComponent;

  /**
   * The component being tested
   */
  let fixture: ComponentFixture<MonthlyComponent>;

  /**
   * Setup for the test
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyComponent],
      imports: [
        MatToolbarModule,
        MatTableModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        })
      ],
      providers: [{provide: WeatherService, useValue: weatherServiceSpy()}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test {@link HourlyComponent}
   */
  it('should create', async () => {
    expect(component).toBeTruthy();
    await setTimeout(() => {}, 5000);
    fixture.detectChanges();
  });
});