import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service'
import { DrivingOffers } from '../../classes/drivingOffers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // _id: string;
  // email: string;
  public password: string = '';
  public firstName: string = '';
  public lastName: string = '';
  // birthdate: Date;
  // cellPhoneNumber: number;
  // imgUrl: string;
  public bio: string = '';
  public street: string = '';
  public houseNumber: number;
  public zip: number;
  public city: string = '';
  // drivingOffers: DrivingOffers;

  public user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  addUser(): void {
    /*if (!this._id && !this.birthdate && !this.cellPhoneNumber && !this.imgUrl && !this.drivingOffers) {
      return;
    }*/
    let user: User = new User(
      this.password,
      this.firstName,
      this.lastName,
      this.bio,
      this.street,
      this.houseNumber,
      this.zip,
      this.city);
    console.log("New user: ", user);
    this.userService.addUser(user)
      .subscribe(user => this.user = user)
  }

}
