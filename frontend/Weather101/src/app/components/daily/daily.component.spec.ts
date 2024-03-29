import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherService } from '../../services/weather.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { DailyComponent } from './daily.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import weatherServiceSpy from '../../app.component.spec';

describe('Daily Component', () => {

  /**
   * The hourlyComponent
   */
  let component: DailyComponent;

  /**
   * The component being tested
   */
  let fixture: ComponentFixture<DailyComponent>;

  /**
   * Setup for the test
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyComponent],
      imports: [
        MatToolbarModule,
        MatTableModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
      ],
      providers: [{provide: WeatherService, useValue: weatherServiceSpy()}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyComponent);
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
