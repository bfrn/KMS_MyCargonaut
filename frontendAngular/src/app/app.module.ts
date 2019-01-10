import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {MatTabsModule} from '@angular/material';


import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DrivingOffersComponent } from './components/driving-offers/driving-offers.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { InsertOfferComponent } from './components/insert-offer/insert-offer.component';
import { DrivingService } from './services/driving.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    MessagesComponent,
    DashboardComponent,
    DrivingOffersComponent,
    RatingsComponent,
    HomepageComponent,
    RegisterComponent,
    AlertComponent,
    ProfilepageComponent,
    UserEditComponent,
    InsertOfferComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,

  ],
  providers: [
    UserService,
    AlertService,
    AuthGuard,
    AdminGuard,
    DrivingService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent,
    HomepageComponent,
    DrivingOffersComponent,
    RegisterComponent,
    ProfilepageComponent,
    UserEditComponent,
    InsertOfferComponent
  ],
})
export class AppModule { }
