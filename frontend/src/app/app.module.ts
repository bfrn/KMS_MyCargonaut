import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import { UserComponent } from './user/user.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { SearchOfferComponent } from './search-offer/search-offer.component';
import { RatingsComponent } from './ratings/ratings.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material';
import {MatNativeDateModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    NewOfferComponent,
    SearchOfferComponent,
    RatingsComponent,
    RegisterComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent],
  entryComponents: [
    AppComponent,
    LoginComponent,
    UserComponent,
    SearchOfferComponent,
    NewOfferComponent,
    RatingsComponent,
    HomepageComponent
  ],
})
export class AppModule { }
