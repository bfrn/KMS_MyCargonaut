import { DrivingOffers } from './drivingOffers'

export class User {
 // _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
 // birthdate: Date;
  // cellPhoneNumber: number;
 // imgUrl: string;
  bio: string;
  street: string;
  houseNumber: number;
  zip: number;
  city: string;
  // drivingOffers: DrivingOffers;

  constructor(username?: string, password?: string, firstName?: string, lastName?: string, bio?: string, street?: string, houseNumber?: number, zip?: number, city?: string) {
  //  this._id = _id;
   this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
   // this.birthdate = birthdate;
   // this.cellPhoneNumber = cellPhoneNumber;
   // this.imgUrl = imgUrl;
    this.bio = bio;
    this.street = street;
    this.houseNumber = houseNumber;
    this.zip = zip;
    this.city = city;
    // this.drivingOffers = drivingOffers;
  }
}
