import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { GxeGalleryActions, GxeGalleryActionTypes } from '../actions/gxe-gallery.actions';

@Injectable()
export class GxeGalleryEffects {

  @Effect()
  effect$ = this.actions$.ofType(GxeGalleryActionTypes.GxeGalleryAction);

  constructor(private actions$: Actions) {}
}
