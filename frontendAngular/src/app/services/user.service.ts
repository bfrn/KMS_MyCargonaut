import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user'
import { Observable, of } from 'rxjs'
import { MessageService} from './message.service'
import { DrivingOffers } from '../classes/drivingOffers';

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

    login(data: any): void {
    //this.log('UserService: added new user');
    console.log("User is being logged in.");
    const url = `${this.userURL}/login`;
    let result = this.http.post(url, data).subscribe(
      data => console.log(JSON.stringify(data)),
      error => console.log(error)
    );
  }

    getUsers(): Observable<User[]>{
    //this.log('UserService: fetched users');
    return this.http.get<User[]>(this.userURL);
  }

  getUser(id: String): Observable<User>{
    //this.log('UserService: fetched user');
    return this.http.get<User>(this.userURL + '/' + id);
  }

  addUser(user: User): Observable<User>{
    //this.log('UserService: added new user');
    console.log("User in Service:", user);
    const url = `${this.userURL}/register`;
    return this.http.post<User>(url, user);
  }

  /** Log a UserService message with the MessageService */
 private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
