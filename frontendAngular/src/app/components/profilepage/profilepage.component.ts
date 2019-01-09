import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../classes/user';
import { UserEditComponent} from '../user-edit/user-edit.component';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile(): void{
    /*Was macht route.snapshot.paramMap.get(id)??*/
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile().subscribe(
      user => this.user = user);
  }

  deleteUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log("User successfully deleted.");
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log("Error deleting user.", error)
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

  deleteCars(): void {
    if (this.pkw) {
      this.pkw = 'false';
    } if (this.transporter) {
      this.transporter = 'false';
    } if (this.lkw) {
      this.lkw = 'false';
    }
    let user: User = new User(
      this.username,
      this.password,
      this.firstName,
      this.lastName,
      this.birthdate,
      this.img,
      this.bio,
      this.street,
      this.houseNumber,
      this.zip,
      this.city,
      this.pkw,
      this.transporter,
      this.lkw);
    //const id = this.route.snapshot.paramMap.get('id');
    this.userService.editUser(user).subscribe(
      (user) => {
        this.user = user;
        this.getUserProfile();
      });
  }

  logout() {
    this.userService.logout();
  }


}
