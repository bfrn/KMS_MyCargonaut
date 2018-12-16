import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { SearchOfferComponent } from './search-offer/search-offer.component';
import { RatingsComponent } from './ratings/ratings.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent},
  { path: 'newOffer', component: NewOfferComponent},
  { path: 'searchOffer', component: SearchOfferComponent},
  { path: 'ratings', component: RatingsComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
