import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UxeGalleryActions, UxeGalleryActionTypes } from '../actions/uxe-gallery.actions';

@Injectable()
export class UxeGalleryEffects {



  constructor(private actions$: Actions) {}
}
