import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private location: Location,
      private router: Router
    ) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(): void{
    /*Was macht route.snapshot.paramMap.get(id)??*/
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
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

  goBack(): void{
    this.location.back();
  }
}
