import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService} from '../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private userURL = 'http://localhost:8080/api/users';

  constructor (private router: Router,
               private http: HttpClient,
               private alertService: AlertService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = `${this.userURL}/checklogin`;
    return this.http.get<boolean>(url).toPromise().then((res) => {
      if (res["response"] != null) {
        return true;
      }
        this.alertService.error("Bitte zuerst einloggen.", true);
        this.router.navigate(['/homepage']);
        return false;

    }).catch((err) => {
      console.error("Authguard Error:"+ err);
      this.alertService.error("Login Status konnte nicht überprüft werden.", true);
      this.router.navigate(['/homepage']);
      return false;
    });
  }
}
