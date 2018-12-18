import { DrivingOffers } from './drivingOffers'
 
export class User {
  _id: String;
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  birthdate: Date;
  cellPhoneNumber: Number;
  imgUrl: String;
  bio: String;
  street: String;
  houseNumber: String;
  zip: String;
  city: String;
  drivingOffers: DrivingOffers;
}
