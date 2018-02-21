import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!(user && user.roles.subscriber)),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
