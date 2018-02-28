import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
// import { isNil } from 'lodash';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CanActivatePassword implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('password') !== 'doggos') {
      this.router.navigate([ 'login' ]);
    }

    return true;
  }
}
