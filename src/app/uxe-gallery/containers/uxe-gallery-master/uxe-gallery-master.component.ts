import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import {
  Store,
} from '@ngrx/store';
import { OverlayService } from '../../components/overlay/overlay-service';
import { PositionalService } from '../../services/positional-service';
import { GalleryItem } from '../../interfaces/gallery-items.interface';
import {
  State,
} from '../../reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from '../../services/gallery-service';
import { EventType } from '../../enums/event-types';


/**
 * @description A list view of gallery and items.
 *
 * @howToUse <uxe-gallery-master [state]="" [galleryItems]=""></uxe-gallery-master>
 * Data and state are passed in via binding galleryItems and state.
 *
 * @example
 *  State and Data can be view from app/+routers/demo/demo.component.ts
 *
 *  State config:
 *  ------------
 *  State comes from global application state using ngrx and is selected via:
 *  this.obsExtended = this.store.pipe(select(selectFeatureExtended));
 *
 *  Data config:
 *  ------------
 *  Is passed in via binding and looks like:
 *  this.galleryItemsObs = this.doggoService.get();
 */
@Component({
  selector: 'uxe-gallery-master',
  templateUrl: './uxe-gallery-master.component.html',
  styleUrls: [ './uxe-gallery-master.component.scss' ],
})
export class UxeGalleryMasterComponent implements OnInit {
  /**
   * A query selection of all list items outermasks.
   */
  @ViewChildren('outerMask') public outerQuery: any;
  /**
   * A query selection of all list items inner images.
   */
  @ViewChildren('imgEl') public imgQuery: any;
  /**
   * An Input binding of component state from ngrx global state.
   */
  @Input() public state: any;

  /**
   * An Input binding of data from tipe.io cms.
   */
  @Input() public galleryItems: Array<Array<GalleryItem>>;

  /**
   * Host component HTMLElement.
   */
  private hostEl: HTMLElement;

  /**
   *
   * @param {UxeGalleryStateService} galleryStateService Helper service around
   *    gallery feature of @ngrx/store.
   * @param {ElementRef} ngHostEl Host component selected by Angular.
   * @param {Renderer2} renderer Angular renderer service.
   * @param {OverlayService} overlayService Service managing overlay ref.
   * @param {PositionalService} posService Service managing positional states.
   */
  constructor(private galleryStateService: UxeGalleryStateService,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private overlayService: OverlayService,
              private posService: PositionalService) {
  }

  /**
   * Init Component selects html and creates resize listeners.
   */
  public ngOnInit(): void {
    this.setHostElement();
    this.resize();
  }

  /**
   * Closes gallery state used from top toolbar close button.
   */
  public closeDetails(): void {
    this.galleryStateService.closeDetailView();
  }

  /**
   * Closes gallery state used from top toolbar close button.
   */
  private setHostElement(): void {
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
  }

  /**
   * OnClick of list item from view.
   *
   * @param index Selected index from list
   * @param outerMask Selected element's outermask
   * @param innerMask Selected elmeent's innermask.
   */
  public selectedItem(index: number,
                      outerMask: HTMLElement,
                      innerMask: HTMLElement) {
    this.cacheGallerySizes();
    this.galleryStateService.openDetailView(index);
    const ref = this.overlayService.open();
    this.posService.set(index, innerMask, ref, this.hostEl);
  }

  /**
   * For animations, computes and caches needed offset values of each element.
   */
  private cacheGallerySizes() {
    this.posService.queryImgs = this.imgQuery._results
      .map(i => {
        return {
          center: PositionalService.getCenterY(this.hostEl, i.nativeElement),
          height: i.nativeElement.getBoundingClientRect().height,
          imgSrc: i.nativeElement.src,
          width: i.nativeElement.width,
        };
      });

    this.posService.queryParent = this.outerQuery._results
      .map(i => i.nativeElement.getBoundingClientRect());
  }

  /**
   * Scaffolds the resize listener to rerun caching of offsets.
   */
  private resize() {
    window.addEventListener(EventType.RESIZE, (e) => {
      this.cacheGallerySizes();
    });
  }
}
