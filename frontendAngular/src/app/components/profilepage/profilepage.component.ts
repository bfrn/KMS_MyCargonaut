import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../classes/user';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {
  @Input() user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile(): void{
    /*Was macht route.snapshot.paramMap.get(id)??*/
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserProfile()
      .subscribe(user => this.user = user);
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

  logout() {
    this.userService.logout();
  }


}
