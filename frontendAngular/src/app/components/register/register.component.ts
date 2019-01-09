import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { DrivingOffers } from '../../classes/drivingOffers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // _id: string;
  public username: string = '';
  public password: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public birthdate: string = '';
  public phone: number;
  public mail: string = '';
  public img: string;
  public bio: string = '';
  public street: string = '';
  public houseNumber: number;
  public zip: number;
  public city: string = '';
  public pkw: string = 'f';
  public transporter: string = 'f';
  public lkw: string = 'f';
  public radio1;
  public radio2;
  // drivingOffers: DrivingOffers;

  public imgGirl: string = "http://banner2.kisspng.com/20180311/kfe/kisspng-car-automotive-design-drawing-female-car-material-5aa4c1d7c0b402.3992907015207469677893.jpg";
    public imgBoy: string = "http://www.clipartmax.com/png/middle/11-115689_cars-2-clip-art-cartoon-car-side-view.png";

  public user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  addUser(): void {
    /*if (!this._id && !this.birthdate && !this.cellPhoneNumber && !this.imgUrl && !this.drivingOffers) {
      return;
    }*/
    if (this.pkw) {
      this.pkw = 'true';
    } if (this.transporter) {
      this.transporter = 'true';
    } if (this.lkw) {
      this.lkw = 'true';
    }

    if (this.radio1) {
      this.img = this.imgGirl;
    } else if (this.radio2) {
      this.img = this.imgBoy;
    }

    let user: User = new User(
      this.username,
      this.password,
      this.firstName,
      this.lastName,
      this.birthdate,
      this.phone,
      this.mail,
      this.img,
      this.bio,
      this.street,
      this.houseNumber,
      this.zip,
      this.city,
      this.pkw,
    this.transporter,
    this.lkw);
    console.log("New user: ", user);
    this.userService.addUser(user)
      .subscribe(user => this.user = user)
  }

}
