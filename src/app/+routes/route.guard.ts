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
import { isNil } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  filter,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  selectFeatureExtended,
  State,
} from '../uxe-gallery/reducers/uxe-gallery.reducer';


@Injectable()
export class CanActivateGallery implements CanActivate {
  constructor(private store: Store<State>, private router: Router) {
  }

  private hasDetails() {
    return this.store.pipe(
      select(selectFeatureExtended),
      tap((data: any) => {
        if (isNil(data.selectedItem)) {
          this.router.navigate([ 'demo' ]);
        }
      }),
      take(1));
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.hasDetails().pipe(
      switchMap(() => {
        return of(true);
      }),
    );
  }
}
