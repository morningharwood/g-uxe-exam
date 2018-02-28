import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../_other/core';



@Component({
  selector: 'mh-login-container-master',
  templateUrl: 'component.html',
  styleUrls: [ 'component.scss' ],
})
export class LoginContainerMasterComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {

  }

  public onSubmit(val) {
    localStorage.setItem('password', val.value);
    this.router.navigate([ '/intro' ]);
  }
}
