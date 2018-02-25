import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  UxeGalleryActions,
  UxeGalleryActionTypes,
} from '../actions/uxe-gallery.actions';

import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { TopbarType } from '../components/topbar/topbar.interface';
import { UxeGallery } from '../uxe-gallery.model';



export interface State extends EntityState<UxeGallery> {
  selectedItem: UxeGallery | null;
  hiddenItem: string | null;
  bottombarTemplate: boolean;
  topbarTemplate: boolean;
  topbarTemplateType: string;
  modalTemplate: boolean;
  canvasTemplate: boolean;
  canvasImg: string | null;
}

export const adapter: EntityAdapter<UxeGallery> = createEntityAdapter<UxeGallery>();


export const initialState: State = adapter.getInitialState({
  ids: ['0'],
  entities: {
    '0': {
      imgSrc: 'url',
      name: 'dog',
      details: 'some dog',
    }
  },
  selectedItem: null,
  hiddenItem: null,
  topbarTemplateType: TopbarType.WHITE,
  topbarTemplate: true,
  bottombarTemplate: false,
  modalTemplate: false,
  canvasTemplate: false,
  canvasImg: null,
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

    case UxeGalleryActionTypes.UpdateSelectedItem: {
      return {...state, selectedItem: action.payload.item};
    }

    case UxeGalleryActionTypes.UpdateHiddenItem: {
      return {...state, hiddenItem: action.payload.id};
    }

    case UxeGalleryActionTypes.ClearToolbars: {
      return {
        ...state,
        topbarTemplate: false,
        bottombarTemplate: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getState = createFeatureSelector<any>('uxeGallery');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getState);


export const selectFeatureExtended = createSelector(getState, (state: State) => {
  return  {
    selectedItem: state.selectedItem,
    hiddenItem: state.hiddenItem,
    bottombarTemplate: state.bottombarTemplate,
    topbarTemplate: state.topbarTemplate,
    topbarTemplateType: state.topbarTemplateType,
    modalTemplate: state.modalTemplate,
    canvasTemplate: state.canvasTemplate,
    canvasImg: state.canvasImg,
  };
});
