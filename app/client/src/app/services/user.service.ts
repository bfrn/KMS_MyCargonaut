import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/User';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  public firstname: string;
  public lastname: string;

  constructor(private http: HttpClient) {
  }

  public user: User;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`); // transforming error for better user consumption
      return of(result as T); // Let the app keep running by returning an empty result.
    };
  }

  public addUser(user: User): Observable<User> {
    console.log("User in Service:", user);
    const url = `/user`;
    return this.http.post<User>(url, user)
      .pipe(
        tap((newUser: User) => {
          console.log("New user in Database: ", newUser);
          return newUser;
        })
      );
  }
}
