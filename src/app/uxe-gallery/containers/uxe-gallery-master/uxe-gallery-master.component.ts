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
import { ItemAnimationsService } from '../../components/item/item.animations';
import { OverlayService } from '../../components/overlay/overlay-service';
import { PositionalService } from '../../components/overlay/positional-service';
import {
  State,
} from '../../reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from '../../services/gallery-service';


export const DATA = [
  { imgSrc: 'https://placeimg.com/440/480/any' },
  { imgSrc: 'https://placeimg.com/540/480/any' },
  { imgSrc: 'https://placeimg.com/630/580/any' },
  { imgSrc: 'https://placeimg.com/341/480/any' },
  { imgSrc: 'https://placeimg.com/543/480/any' },
  { imgSrc: 'https://placeimg.com/637/588/any' },
  { imgSrc: 'https://placeimg.com/349/384/any' },
  { imgSrc: 'https://placeimg.com/244/385/any' },
  { imgSrc: 'https://placeimg.com/630/386/any' },
  { imgSrc: 'https://placeimg.com/640/780/any' },
  { imgSrc: 'https://placeimg.com/650/380/any' },
  { imgSrc: 'https://placeimg.com/641/488/any' },
  { imgSrc: 'https://placeimg.com/653/489/any' },
  { imgSrc: 'https://placeimg.com/445/481/any' },
  { imgSrc: 'https://placeimg.com/943/485/any' },
  { imgSrc: 'https://placeimg.com/542/484/any' },
  { imgSrc: 'https://placeimg.com/746/681/any' },
  { imgSrc: 'https://placeimg.com/548/480/any' },
  { imgSrc: 'https://placeimg.com/441/380/any' },
];

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
  @ViewChildren('outerMask') private outerQuery: any;
  @ViewChildren('imgEl') private imgQuery: any;

  public collection = DATA;

  constructor(private store: Store<State>,
              private galleryStateService: UxeGalleryStateService,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private overlayService: OverlayService,
              private posService: PositionalService,
              private animationService: ItemAnimationsService,
              private router: Router) {
  }

  ngOnInit() {
    this.setHostElement();
  }


  public closeDetails() {
    this.router.navigate(['/demo']);
    this.galleryStateService.closeDetailView();
    this.animationService.endAnimate();
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

  public setSelectedItem(item: number): void {
    this.galleryStateService.setSelectedItem(item);
  }
  //
  public hiddenItem(id: string): void {
    this.galleryStateService.setHiddenItem(id);
  }

  public setModalState(isActive: boolean): void {
    this.galleryStateService.setModalState(isActive);
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
