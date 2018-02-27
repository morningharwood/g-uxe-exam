import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  select,
  Store,
} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {filter, take, tap} from 'rxjs/operators';
import {
  selectFeatureExtended,
  State,
} from '../uxe-gallery/reducers/uxe-gallery.reducer';
import {isNil} from 'lodash';
@Injectable()
export class CanActivateGallery implements CanActivate {
  constructor(private store: Store<State>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    this.store.pipe(
      select(selectFeatureExtended),
      tap((data: any) => {
        if (isNil(data.selectedItem)) {
          this.router.navigate(['demo']);
        }
      }),
      take(1),
    ).subscribe(console.log);
    return true;
  }
}
