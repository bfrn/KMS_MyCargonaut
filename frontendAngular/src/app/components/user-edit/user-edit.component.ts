import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from '../../classes/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() user: User;

  public username: string = '';
  public password: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public birthdate: string = '';
  // cellPhoneNumber: number;
  public img: string;
  public bio: string = '';
  public street: string = '';
  public houseNumber: number;
  public zip: number;
  public city: string = '';
  public pkw: string = 'f';
  public transporter: string = 'f';
  public lkw: string = 'f';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  saveUser() {
    if (this.pkw) {
      this.pkw = 'true';
    } if (this.transporter) {
      this.transporter = 'true';
    } if (this.lkw) {
      this.lkw = 'true';
    }
    //this.activeModal.close(this.user);
    this.activeModal.close(this.user);
    console.log("editUser().UserEditComponent:", this.user);
  }

}
