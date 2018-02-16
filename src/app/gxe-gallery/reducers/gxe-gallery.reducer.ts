import { Action } from '@ngrx/store';
import { GxeGalleryActions, GxeGalleryActionTypes } from '../actions/gxe-gallery.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: GxeGalleryActions): State {
  switch (action.type) {

    case GxeGalleryActionTypes.GxeGalleryAction:
      return state;


    default:
      return state;
  }
}
