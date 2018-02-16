import {
  AnimationBuilder,
} from '@angular/animations';
import {
  Component, HostBinding, HostListener,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GalleryItem, mockGalleryItems } from '../../mock-data';




@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {
  public galleryItems: GalleryItem[] = mockGalleryItems;
  public isActive = false;

  constructor(private store: Store<any>,
              private builder: AnimationBuilder) {
  }

  public ngOnInit(): void {

  }
  @HostListener('click')
  public addClass() {
    this.isActive = !this.isActive;
  }



}
