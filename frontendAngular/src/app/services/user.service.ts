import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user'
import { Observable, of } from 'rxjs'
import { MessageService} from './message.service'
import { DrivingOffers } from '../classes/drivingOffers';
import { tap, catchError, map} from 'rxjs/operators';
import { AlertService} from './alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // _id: string;
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  // birthdate: Date;
  // cellPhoneNumber: number;
  // imgUrl: string;
  bio: string = '';
  street: string = '';
  houseNumber: number;
  zip: number;
  city: string = '';
  userId: string;
  // drivingOffers: DrivingOffers;

  /** URL to web api */
  private userURL = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private alertService : AlertService,
    private router: Router) { }

  user: User;

  /** login function that passes the username and password within a data object to the login route */
    login(data: any) {

    //this.log('UserService: added new user');
    console.log("User is being logged in.");
    const url = `${this.userURL}/login`;
    return this.http.post(url, data,{
      withCredentials: true  // <=========== important!
    });
  }

  logout() {
      const url = `${this.userURL}/logout`;
      return this.http.get(url, {
        withCredentials: true  // <=========== important!
  }).toPromise().then((response) => {
        response = JSON.parse(JSON.stringify(response)).success;
        console.log("Response" + response);
        if (response == true) {
          this.alertService.success("Erfolgreich ausgeloggt.", true);
          this.router.navigate(['/homepage']);
          return true;
      }}).catch((err) => {
        console.error("Logout Error:" + err);
        this.alertService.error("Logout konnte nicht erfolgreich durchgeführt werden.", true);
        this.router.navigate(['/homepage']);
        return false;
      });
  }

    getUsers(): Observable<User[]>{
    //this.log('UserService: fetched users');
    return this.http.get<User[]>(this.userURL);
  }

  getUser(id: String): Observable<User>{
    //this.log('UserService: fetched user');
    return this.http.get<User>(this.userURL + '/' + id);
  }

  getUserProfile(): Observable<User>{
    //this.log('UserService: fetched user');
    return this.http.get<User>(this.userURL + '/profile', {withCredentials: true});
  }

  /** register function that passes the user data within an object to the register route */
  addUser(user: User): Observable<User>{
    //this.log('UserService: added new user');
    console.log("User in Service:", user);
    const url = `${this.userURL}/register`;
    return this.http.post<User>(url, user);
  }

  deleteUser (id: String) {
    return this.http.delete<User>(this.userURL + '/' + id);
  }

  /** Log a UserService message with the MessageService */
 private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}