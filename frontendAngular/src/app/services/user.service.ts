import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user'
import { Observable, of } from 'rxjs'
import { MessageService} from './message.service'
import { DrivingOffers } from '../classes/drivingOffers';
import { tap, catchError, map} from 'rxjs/operators';

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
  // drivingOffers: DrivingOffers;

  /** URL to web api */
  private userURL = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

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

    getUsers(): Observable<User[]>{
    //this.log('UserService: fetched users');
    return this.http.get<User[]>(this.userURL);
  }

  getUser(id: String): Observable<User>{
    //this.log('UserService: fetched user');
    return this.http.get<User>(this.userURL + '/' + id);
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
