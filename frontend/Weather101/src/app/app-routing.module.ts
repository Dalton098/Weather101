import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyComponent } from './components/hourly/hourly.component';
import { AppComponent } from './app.component';

const routes: Routes = [
                        {path: '/', component: AppComponent}, 
                        {path: 'hourlyDn', component: HourlyComponent} 
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
