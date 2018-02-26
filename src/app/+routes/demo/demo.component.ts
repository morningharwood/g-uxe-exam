import { Component, OnInit } from '@angular/core';
import {
  select,
  Store,
} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DoggoService } from '../../backend-tipe/doggo/doggo.service';
import { GalleryItem } from '../../gxe-gallery/interfaces/gallery-items.interface';
import { selectFeatureExtended } from '../../uxe-gallery/reducers/uxe-gallery.reducer';

@Component({
  selector: 'gxe-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class GxeDemoComponent implements OnInit {

  /**
   * OnInit doggoService will fetch doggo data.
   * Doggo data will hydrate the gallery Template from the observable.
   */
  public galleryItemsObs: Observable<Array<Array<GalleryItem>>>;
  public obsExtended: Observable<any>;

  constructor(private doggoService: DoggoService,
              private store: Store<any>) {}

  public ngOnInit(): void {
    this.galleryItemsObs = this.doggoService.get();
    this.obsExtended = this.store.pipe(select(selectFeatureExtended));
  }
}
