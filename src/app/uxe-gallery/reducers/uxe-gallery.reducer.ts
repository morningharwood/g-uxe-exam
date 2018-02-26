import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  SetCanvasSource,
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
  animationState: string;
  selectedItem: number | null;
  hiddenItem: string | null;
  bottombarTemplate: boolean;
  topbarTemplate: boolean;
  topbarTemplateType: string;
  modalTemplate: boolean;
  detailTemplate: boolean;
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
  animationState: 'closed',
  selectedItem: null,
  hiddenItem: null,
  topbarTemplateType: TopbarType.WHITE,
  topbarTemplate: true,
  bottombarTemplate: false,
  detailTemplate: false,
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

    case UxeGalleryActionTypes.SetToolbarState: {
      return {
        ...state,
        [action.payload.propName]: action.payload.isActive,
      };
    }

    case UxeGalleryActionTypes.SetModalState: {
      return {
        ...state,
        modalTemplate: action.payload.isActive,
      };
    }

    case UxeGalleryActionTypes.SetDetailState: {
      return {
        ...state,
        detailTemplate: action.payload.isActive,
      };
    }

    case UxeGalleryActionTypes.SetCanvasState: {
      return {
        ...state,
        canvasTemplate: action.payload.isActive,
      };
    }

    case UxeGalleryActionTypes.SetCanvasSource: {
      return {
        ...state,
        canvasImg: action.payload.source,
      };
    }

    case UxeGalleryActionTypes.SetTopbarType: {
      return {
        ...state,
        topbarTemplateType: action.payload.type,
      };
    }
    case UxeGalleryActionTypes.SetAnimationState: {
      return {
        ...state,
        animationState: action.payload.type,
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
    animationState: state.animationState,
    selectedItem: state.selectedItem,
    hiddenItem: state.hiddenItem,
    bottombarTemplate: state.bottombarTemplate,
    topbarTemplate: state.topbarTemplate,
    topbarTemplateType: state.topbarTemplateType,
    modalTemplate: state.modalTemplate,
    canvasTemplate: state.canvasTemplate,
    detailTemplate: state.detailTemplate,
    canvasImg: state.canvasImg,
  };
});
