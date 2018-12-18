import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

const httpOptions = {
  // headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

}


