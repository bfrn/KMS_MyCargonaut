import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  public user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(): void {
    console.log("Username: " + this.username + "Password: " + this.password);
    let data: Object = {username: this.username, password: this.password};
    this.userService.login(data);
  }

}
