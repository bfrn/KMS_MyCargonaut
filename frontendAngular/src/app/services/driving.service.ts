import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user'
import { Observable, of } from 'rxjs'
import { MessageService} from './message.service'
import { DrivingOffers } from '../classes/drivingOffers';
import { tap, catchError, map} from 'rxjs/operators';
import { AlertService} from './alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Drive} from '../classes/drive';


@Injectable({
  providedIn: 'root'
})
export class DrivingService {

  public date: string = '';
  public origin:  string = '';
  public destination: string = '';
  public restrictions: string = '';
  public preferences:  string = '';
  public price: number;
  public hasFixedPrice: boolean;
  public cargoWeightInKg: number;
  public loadingSpaceDimensions: number[];
  public personCnt: number;

  private userURL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient,
              private alertService : AlertService,
              private router: Router) { }

  public drive: Drive;

  addDrive(drive: Drive): Observable<Drive>{
    //this.log('UserService: added new user');
    console.log("Drive in Service:", drive);
    const url = `${this.userURL}/drivingOffers`;
    return this.http.post<Drive>(url, drive, {
      withCredentials: true  // <=========== important!
    });
  }

  getDrivingOffers(): Observable<Drive[]> {
    //this.log('UserService: fetched users');
    const url = `${this.userURL}/drivingRequests/all`;
    return this.http.get<Drive[]>(url, {
      withCredentials: true  // <=========== important!
    });
  }

  searchDrive(data: any): Observable<Drive[]> {
    console.log("Data " + data);
    const url = `${this.userURL}/drivingRequests/search`;
    return this.http.post<Drive[]>(url, data)
  }

  showDrives(id: String): Observable<Drive[]> {
    console.log("User:", id);
    //const url = `${this.userURL}/username`;
    return this.http.get<Drive[]>(this.userURL + '/' + id + '/drivingOffers', {
      withCredentials: true  // <=========== important!
    });

  }

  delete(id: String) {
    return this.http.delete<Drive>(this.userURL + '/drivingOffers/' + id);
  }

  deleteAll(): Observable<Drive[]> {
    return this.http.delete<Drive>(this.userURL + '/all/drivingOffers/delete');
  }


}
