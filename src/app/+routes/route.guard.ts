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
import {
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

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.pipe(
      select(selectFeatureExtended),
      tap((data: any) => {
        console.log(data.selectedItem);
        if (isNil(data.selectedItem)) {
          this.router.navigate([ 'demo' ]);
        }
      }),
      take(1),
    );
    return true;
  }
}
