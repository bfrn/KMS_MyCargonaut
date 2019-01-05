import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService} from '../../services/user.service';
import { AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[];
  public username: string = '';
  public password: string = '';

  admin: boolean = false;

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users.slice(0));
  }
}
