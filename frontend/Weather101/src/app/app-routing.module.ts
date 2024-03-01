import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyComponent } from './components/hourly/hourly.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DailyComponent } from './components/daily/daily.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'daily', component: DailyComponent},
  {path: 'hourly', component: HourlyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
