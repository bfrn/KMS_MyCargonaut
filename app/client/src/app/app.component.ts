import { Component } from '@angular/core';
import { User } from './classes/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test App';
  public firstname: string = '';
  public lastname: string = '';

  public user: User;

  constructor(public userservice: UserService) { }

  // Funktion um neuen Nutzer hinzuzufügen bzw. in Datenbank zu hinterlegen
  // Databinding über [(ngModel)] in app.component.html
  // nutzt "UserService", zentralen Service für Datenbankkommunikation
  add(): void {
    let newUser: User = new User(
      this.firstname,
        this.lastname);
    console.log("New User: ", newUser);
    this.userservice.addUser(newUser).subscribe((result) => {
        console.log("component:", result);
        this.firstname = result.firstname;
        this.lastname = result.lastname;
      },
      (err) => {
        console.log("Error add().user.component.ts", err)
      });
    }
  }

