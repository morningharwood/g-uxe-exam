import {
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GalleryItem } from './gxe-gallery/interfaces/gallery-items.interface';
import { DoggoService } from './services/doggo.service';

@Component({
  selector: 'gxe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public galleryItemsObs: Observable<Array<Array<GalleryItem>>>;
  constructor(private doggoService: DoggoService) {}

  public ngOnInit(): void {
    this.galleryItemsObs = this.doggoService.get();
  }
}
