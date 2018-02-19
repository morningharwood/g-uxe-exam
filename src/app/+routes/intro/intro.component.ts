import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GalleryItem } from '../../gxe-gallery/interfaces/gallery-items.interface';
import { DoggoService } from '../../services/doggo/doggo.service';

@Component({
  selector: 'gxe-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

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
