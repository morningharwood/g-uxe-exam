import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUxeGallery from '../uxe-gallery/reducers/uxe-gallery.reducer';

export interface State {

  uxeGallery: fromUxeGallery.State;
}

export const reducers: ActionReducerMap<State> = {

  uxeGallery: fromUxeGallery.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
