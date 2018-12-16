import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    NewOfferComponent,
    SearchOfferComponent,
    RatingsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [
    AppComponent],
  entryComponents: [
    AppComponent,
    LoginComponent,
    UserComponent,
    SearchOfferComponent,
    NewOfferComponent,
    RatingsComponent
  ],
})
export class AppModule { }
