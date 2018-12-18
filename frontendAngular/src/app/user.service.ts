import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user'
import { Observable, of } from 'rxjs'
import { MessageService} from './message.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /** URL to web api */ 
  private userURL = 'http://localhost:8080/api/users';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  getUsers(): Observable<User[]>{
    this.messageService.add('UserService: fetched heroes');
    return this.http.get<User[]>(this.userURL);
  }
  getUser(id: String): Observable<User>{
    this.messageService.add('UserService: fetched heroes');
    return this.http.get<User>(this.userURL + '/' + id);
  }
  /** Log a UserService message with the MessageService */
  /*private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }*/
}
