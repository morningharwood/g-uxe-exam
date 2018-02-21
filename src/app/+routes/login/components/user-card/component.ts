import { Component, Input, OnInit } from '@angular/core';
import {
  AuthService,
  User,
} from '../../../../_other/core';
import { Router } from '@angular/router';



@Component({
  selector: 'mh-user-card',
  templateUrl: 'component.html',
  styleUrls: [ 'component.scss' ],
})
export class UserCardComponent implements OnInit {
  @Input() public user: User;

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {}

  public login() {
    this.auth.googleLogin().then((d) => {
      this.router.navigate(['/intro'])
    });
  }

  public logout() {
    this.auth.googleLogout().then(console.log);
  }

  public go(path) {
    // this.please.go(path);
  }
}
