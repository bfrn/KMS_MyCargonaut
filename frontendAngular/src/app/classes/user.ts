import { DrivingOffers } from './drivingOffers'

export class User {
 // _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  // cellPhoneNumber: number;
 img: string;
  bio: string;
  street: string;
  houseNumber: number;
  zip: number;
  city: string;
  pkw: string;
  transporter: string;
  lkw: string;
  // drivingOffers: DrivingOffers;
  loggedIn: boolean = false;

  constructor(username?: string, password?: string, firstName?: string, lastName?: string, birthdate?: string, img?: string, bio?: string, street?: string,
              houseNumber?: number, zip?: number, city?: string, pkw?: string, transporter?: string, lkw?: string, loggedIn?: boolean) {
  //  this._id = _id;
   this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
   this.birthdate = birthdate;
   // this.cellPhoneNumber = cellPhoneNumber;
   this.img = img;
    this.bio = bio;
    this.street = street;
    this.houseNumber = houseNumber;
    this.zip = zip;
    this.city = city;
    // this.drivingOffers = drivingOffers;
    this.pkw = pkw;
    this.transporter = transporter;
    this.lkw = lkw;
    this.loggedIn = loggedIn;
  }
}
