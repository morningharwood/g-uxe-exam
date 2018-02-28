import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GalleryItem } from '../../uxe-gallery/interfaces/gallery-items.interface';
import { DoggoService } from './doggo.service';


@Injectable()
export class DoggoResolve implements Resolve<any> {
  public cacheDoggos: Observable<Array<Array<GalleryItem>>>;

  constructor(private doggoService: DoggoService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    if (this.cacheDoggos) {
      return this.cacheDoggos;
    } else {
      this.cacheDoggos = this.doggoService.get();
      return this.cacheDoggos;
    }
  }
}
