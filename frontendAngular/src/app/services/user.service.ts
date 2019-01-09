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

  /*editUser(user: User): Observable<User> {
    const url = `${this.userURL}/username`;
    return this.http.put<User>(url, user, {
      withCredentials: true  // <=========== important!
    });
  }*/

  editUser(userToEdit: User): Observable<User> {
    console.log("editUser() User:", userToEdit);
    const url = `${this.userURL}/username`;
    return this.http.put<User>(url, userToEdit, {
      withCredentials: true  // <=========== important!
    }).subscribe(() => {
        console.log("User from Userservice successfully updated.");
      }, (err) => {
        console.log('Error:', err);

      }
    );
  }

  editCars(user: User): Observable<User>{
    const url = `${this.userURL}/cars`;
    return this.http.put<User>(url, user, {
      withCredentials: true  // <=========== important!
    }).subscribe(() => {
        console.log("User cars from Userservice successfully updated.");
      }, (err) => {
        console.log('Error:', err);

      }
    );

  }

  deleteUser (id: String) {
    return this.http.delete<User>(this.userURL + '/' + id);
  }

  /** Log a UserService message with the MessageService */
 private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
