import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../classes/user';
import {Drive} from '../../classes/drive';
import { UserEditComponent} from '../user-edit/user-edit.component';
import { AlertService } from '../../services/alert.service';
import {DrivingService} from '../../services/driving.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  @Input() user: User;
  drives: Drive[];

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
  public pkw: string = 'false';
  public transporter: string = 'false';
  public lkw: string = 'false';

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private location: Location,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService,
    public drivingService: DrivingService,
  ) {}

  ngOnInit() {
    this.getUserProfile();
    this.showDrives();
  }
  getUserProfile(): void{
    /*Was macht route.snapshot.paramMap.get(id)??*/
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile().subscribe(
      user => this.user = user);
  }

  deleteUser(): void {
    const id: string = this.user._id;
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log("User successfully deleted.");
        this.router.navigate(['/homepage']);
        this.alertService.success("Profil wurde erfolgreich gelöscht.", true);
      },
      error => {
        console.log("Error deleting user.", error),
          this.alertService.error("Profil konnte nicht gelöscht werden.", true);
      })
  }

  editUser() {
    this.getUserProfile();
    const modalReference = this.modalService.open(UserEditComponent);
    modalReference.componentInstance.user = this.user;
    console.log(modalReference.componentInstance);
    console.log("editUser().openModal.key:", modalReference.componentInstance.user.username);
    modalReference.result.then((modalUser) => { //modalUser?
      console.log("edited user:", modalUser);
      this.userService.editUser(modalUser);
    }).catch((error) => {
      console.error("User could not be updated: " + error);
    })
  }


  showDrives(): void {
    const id: string = this.user._id;
    console.log("User: "+ id);
    this.drivingService.showDrives(id).subscribe(
      drives => this.drives = drives);
  }



}
