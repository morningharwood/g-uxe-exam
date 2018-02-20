import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DoggoService } from '../../backend-tipe/doggo/doggo.service';
import { GalleryItem } from '../../gxe-gallery/interfaces/gallery-items.interface';

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

  constructor(private doggoService: DoggoService) {}

  public ngOnInit(): void {
    this.galleryItemsObs = this.doggoService.get();
  }

}
