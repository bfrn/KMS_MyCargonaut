import { Injectable } from '@angular/core';
import { User } from './user'
import { USERS } from './mock-users'
import { Observable, of } from 'rxjs'
import { MessageService} from './message.service'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public messageService: MessageService) { }
  getUsers(): Observable<User[]>{
    this.messageService.add('UserService: fetched users');
    return of(USERS);
  }
  getUser(id: number): Observable<User>{
    this.messageService.add('UserService: fetched user')
    return of(USERS.find(user => user.id === id));
  }
}
