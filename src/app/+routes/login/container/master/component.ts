import {
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../_other/core';
import { EventType } from '../../../../uxe-gallery/enums/event-types';



@Component({
  selector: 'mh-login-container-master',
  templateUrl: 'component.html',
  styleUrls: [ 'component.scss' ],
})
export class LoginContainerMasterComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {

  }
  @HostListener(EventType.KEYUP, ['$event'])
  public onSubmitEnter(event) {
    if(event.keyCode === 13) {
      console.log('key uppp', event.target.value);
      localStorage.setItem('password', event.target.value);
      this.router.navigate([ '/intro' ]);
    }
  }


  public onSubmit(val) {
    localStorage.setItem('password', val.value);
    this.router.navigate([ '/intro' ]);
  }
}
