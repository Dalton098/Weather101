import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyComponent } from './components/hourly/hourly.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DailyComponent } from './components/daily/daily.component';
import { WeeklyComponent } from './components/weekly/weekly.component';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { AlertsComponent } from './components/alerts/alerts.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'daily', component: DailyComponent },
  { path: 'hourly', component: HourlyComponent },
  { path: 'weekly', component: WeeklyComponent },
  { path: 'monthly', component: MonthlyComponent },
  { path: 'alerts', component: AlertsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
