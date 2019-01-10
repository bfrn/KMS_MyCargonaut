import {DrivingOffers} from './drivingOffers';
import {User} from './user';

export class Drive {
  public date: string;
  public origin:  string;
  public destination: string;
  public restrictions: string;
  public preferences:  string;
  public price: number;
  public hasFixedPrice: boolean;
  public cargoWeightInKg: number;
  //public loadingSpaceDimensions: number[] = [];
  public personCnt: number;

  constructor (date?: string, origin?: string, destination?: string, restrictions?: string, preferences?: string, price?: number,
               hasFixedPrice?: boolean, cargoWeightInKg?: number, personCnt?: number) {

    this.date = date;
    this.origin = origin;
    this.destination = destination;
    this.restrictions = restrictions;
    this.preferences = preferences;
    this.price = price;
    this.hasFixedPrice = hasFixedPrice;
    this.cargoWeightInKg = cargoWeightInKg;
    //this.loadingSpaceDimensions = loadingSpaceDimensions;
    this.personCnt = personCnt;

  }
}
