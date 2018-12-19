import { Component, OnInit } from '@angular/core';
import { User } from '../classes/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public firstname: string;
  public lastname: string;
  public username: string;
  public password: string;

  public user: User;

  constructor() { }

  ngOnInit() {
  }

  /*add(): void {
    let newUser: User = new User(
      this.firstname,
      this.lastname,
      this.username,
      this.password);
    console.log("New user: ", newUser);
    this.userservice.addUser(newUser)
      .subscribe((result) => {
          console.log("component:", result);
          //this.getUser();
        },
        (err) => {
          console.log("Error add().user.component.ts", err)
        });
  }*/

}
