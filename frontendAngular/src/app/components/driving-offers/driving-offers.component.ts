import { Component, Input, OnInit } from '@angular/core';
import {DrivingService} from '../../services/driving.service';
import { AlertService} from '../../services/alert.service';
import { Router } from '@angular/router';
import {Drive} from '../../classes/drive';
import { Observable, of } from 'rxjs';
import { User } from '../../classes/user';

@Component({
  selector: 'app-driving-offers',
  templateUrl: './driving-offers.component.html',
  styleUrls: ['./driving-offers.component.scss']
})
export class DrivingOffersComponent implements OnInit {

  @Input() drive: Drive;
  drives: Drive[];
  user: User;


  public date: string = '';
  public origin:  string = '';
  public destination: string  = '';
  public restrictions: string  = '';
  public preferences:  string  = '';
  public price: number;
  public hasFixedPrice: boolean;
  public cargoWeightInKg: number;

  public start: string = '';
  public finish: string = '';

  public username: string = '';

  public isCollapsed = true;
  constructor(private drivingService: DrivingService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
    this.getDrivingOffers();
  }

  getDrivingOffers(): void {
    this.drivingService.getDrivingOffers()
      .subscribe(drives => this.drives = drives);
  }

  searchDrive(): void {
    let data: Object = {origin: this.origin, destination: this.destination};
    console.log("Driving Offer " + JSON.parse(JSON.stringify(data)));
    return this.drivingService.searchDrive(data)
      .subscribe(drives => this.drives = drives);
  }

  delete(): void {
    const id: string = this.drive._id;
    this.drivingService.delete(id).subscribe(
      () => {
        console.log("Drives deleted.");
        this.alertService.success("Fahrt wurde erfolgreich gelöscht.", true);
      },
      error => {
        console.log("Error deleting drive.", error),
          this.alertService.error("Fahrt konnte nicht gelöscht werden.", true);
      })
  }

}
