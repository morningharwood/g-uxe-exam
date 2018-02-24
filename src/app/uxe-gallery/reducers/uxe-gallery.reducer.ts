import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
  UxeGalleryActions,
  UxeGalleryActionTypes,
} from '../actions/uxe-gallery.actions';
import { UxeGallery } from '../uxe-gallery.model';

export interface State extends EntityState<UxeGallery> {
  // additional entities state properties
}

export const adapter: EntityAdapter<UxeGallery> = createEntityAdapter<UxeGallery>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: UxeGalleryActions
): State {
  switch (action.type) {
    case UxeGalleryActionTypes.AddUxeGallery: {
      return adapter.addOne(action.payload.uxeGallery, state);
    }


    case UxeGalleryActionTypes.AddUxeGallerys: {
      return adapter.addMany(action.payload.uxeGallerys, state);
    }

    case UxeGalleryActionTypes.UpdateUxeGallery: {
      return adapter.updateOne(action.payload.uxeGallery, state);
    }

    case UxeGalleryActionTypes.UpdateUxeGallerys: {
      return adapter.updateMany(action.payload.uxeGallerys, state);
    }

    case UxeGalleryActionTypes.DeleteUxeGallery: {
      return adapter.removeOne(action.payload.id, state);
    }

    case UxeGalleryActionTypes.DeleteUxeGallerys: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case UxeGalleryActionTypes.LoadUxeGallerys: {
      return adapter.addAll(action.payload.uxeGallerys, state);
    }

    case UxeGalleryActionTypes.ClearUxeGallerys: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
