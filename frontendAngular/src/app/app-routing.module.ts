import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DrivingOffersComponent } from './components/driving-offers/driving-offers.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'users', component: UsersComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: UserDetailComponent},
  { path: 'homepage', component: HomepageComponent},
  { path: 'drivingOffers', component: DrivingOffersComponent}

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
