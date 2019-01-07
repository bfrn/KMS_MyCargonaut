import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Error } from 'tslint/lib/error';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  public user: User;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  loggedIn: boolean = false;

  login(): void {
    let data: Object = {username: this.username, password: this.password};
    this.userService.login(data).subscribe(
      (data) => {
        console.log("User was logged in successfully: " + data);
        this.alertService.success("Eingeloggt.", true);
        //this.router.navigate(['/dashboard']); //muss angepasst werden
        //this.loggedIn = true;
        //console.log(sessionId);
        //return sessionId;
      },
      (error) => {
        console.log("Error logging in the user:");
        this.alertService.error("Fehler beim Einloggen.", error)
    })
  }
}
