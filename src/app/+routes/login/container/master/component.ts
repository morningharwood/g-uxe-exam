import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../_other/core';



@Component({
  selector: 'mh-login-container-master',
  templateUrl: 'component.html',
  styleUrls: [ 'component.scss' ],
})
export class LoginContainerMasterComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {

  }
}
