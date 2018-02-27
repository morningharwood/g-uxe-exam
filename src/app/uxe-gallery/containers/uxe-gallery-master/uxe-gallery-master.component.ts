import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Store,
} from '@ngrx/store';
import { ItemAnimationsService } from '../uxe-animation-portal/item.animations';
import { OverlayService } from '../../components/overlay/overlay-service';
import { PositionalService } from '../../components/overlay/positional-service';
import {
  State,
} from '../../reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from '../../services/gallery-service';



export enum AnimationState {
  START = 'start',
  END = 'end',
}

@Component({
  selector: 'uxe-gallery-master',
  templateUrl: './uxe-gallery-master.component.html',
  styleUrls: [ './uxe-gallery-master.component.scss' ],
})
export class UxeGalleryMasterComponent implements OnInit {
  private hostEl: any;
  @Input() state: any;
  @Input() galleryItems: any;
  @ViewChildren('outerMask') private outerQuery: any;
  @ViewChildren('imgEl') private imgQuery: any;


  constructor(private store: Store<State>,
              private galleryStateService: UxeGalleryStateService,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private overlayService: OverlayService,
              private posService: PositionalService) {
  }

  ngOnInit() {
    this.setHostElement();
  }


  public closeDetails() {
    this.galleryStateService.closeDetailView();
  }

  public setHostElement() {
    // TODO (mharwood) call this again on window.resize.
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
  }

  public selectedItem(index: number,
                      outerMask: any,
                      innerMask: any) {
    this.cacheGallerySizes();
    this.galleryStateService.openDetailView(index);
    const ref = this.overlayService.open();
    this.posService.set(index, innerMask, ref, this.hostEl);
  }

  private cacheGallerySizes() {
    this.posService.queryImgs = this.imgQuery._results
      .map(i => {
        return {
          center: PositionalService.getCenterY(this.hostEl, i.nativeElement),
          height: i.nativeElement.offsetHeight,
          imgSrc: i.nativeElement.src,
          width: i.nativeElement.width,
        };
      });

    this.posService.queryParent = this.outerQuery._results
      .map(i => i.nativeElement.getBoundingClientRect());
  }
}
