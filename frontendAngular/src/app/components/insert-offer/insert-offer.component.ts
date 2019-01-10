import { Component, OnInit } from '@angular/core';
import {Drive} from '../../classes/drive';
import {DrivingService} from '../../services/driving.service';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-offer',
  templateUrl: './insert-offer.component.html',
  styleUrls: ['./insert-offer.component.css']
})
export class InsertOfferComponent implements OnInit {

  public date: string = '';
  public origin:  string = '';
  public destination: string = '';
  public restrictions: string = '';
  public preferences:  string = '';
  public price: number;
  public hasFixedPrice: boolean;
  public cargoWeightInKg: number;
  public loadingSpaceDimensions: number[] = [];
  public personCnt: number;

  public drive: Drive;

  constructor(private drivingService: DrivingService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  addDrive(): void {
    let drive: Drive = new Drive(
      this.date,
      this.origin,
      this.destination,
      this.restrictions,
      this.preferences,
      this.price,
      this.hasFixedPrice,
      this.cargoWeightInKg,
      this.personCnt);
    console.log("New drive: ", drive);
    this.drivingService.addDrive(drive)
      .subscribe(
        drive => {
          this.drive = drive;
          this.alertService.success("Neue Fahrt eingestellt.", true);
          this.router.navigate(['/offers']); //muss angepasst werden
        },
        (err) => {
          this.alertService.error("Bitte alle Felder ausfüllen.", true);
        })
  }

}
