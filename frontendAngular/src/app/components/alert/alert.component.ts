import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from '../../services/alert.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
    this.alertService.getMessage().pipe(
      debounceTime(3500)
    ).subscribe(() => this.message = null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
