import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { GxeGalleryEffects } from './gxe-gallery.effects';

describe('GxeGalleryService', () => {
  let actions$: Observable<any>;
  let effects: GxeGalleryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GxeGalleryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(GxeGalleryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
