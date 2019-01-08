import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DrivingOffersComponent } from './components/driving-offers/driving-offers.component';
import { RegisterComponent} from './components/register/register.component';
import {ProfilepageComponent} from './components/profilepage/profilepage.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'users', component: UsersComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  { path: 'detail/:id', component: UserDetailComponent, canActivate: [AdminGuard]},
  { path: 'homepage', component: HomepageComponent},
  { path: 'drivingOffers', component: DrivingOffersComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfilepageComponent},

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
