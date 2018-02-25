import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UxeGallery } from '../../uxe-gallery.model';

import {
  select,
  Store,
} from '@ngrx/store';
import { OverlayService } from '../../components/overlay/overlay-service';
import { PositionalService } from '../../components/overlay/positional-service';
import {
  selectAll,
  selectFeatureExtended,
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
  animations: [],
})
export class UxeGalleryMasterComponent implements OnInit {
  private obs: Observable<UxeGallery[]>;
  private obsExtended: Observable<any>;
  private hostEl: any;
  @ViewChild('container') private containerEl: any;

  constructor(private store: Store<State>,
              private galleryStateService: UxeGalleryStateService,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private overlayService: OverlayService,
              private posService: PositionalService) {
  }

  ngOnInit() {
    this.obs = this.store.pipe(select(selectAll));
    this.obsExtended = this.store.pipe(select(selectFeatureExtended));
    this.obsExtended.subscribe(console.log);
    this.setHostElement();
  }

  public setHostElement() {
    // TODO (mharwood) call this again on window.resize.
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
  }

  public selectedItem(item: number,
                      outerMask: any,
                      innerMask: any,
                      imgEl: any) {
    // this.setSelectedItem(item);
    // this.setModalState(true);
    this.posService.set(item, this.hostEl, outerMask, innerMask, imgEl);
    const ref = this.overlayService.open();
    // console.log(posA.x, posA.y, posB, posC);
    // Host will give you the animation end position with centerImageY
    // outerMask will give you starting position.
    // innerMask is the animation element
    // imgEl will give you the height animation values
    // Animate the image from center to topleft
    // this.itemAnimate(move, innerMask);
    // When animations complete redirect to detail
  }

  // public setSelectedItem(item: UxeGallery): void {
  //   this.galleryStateService.setSelectedItem(item);
  // }
  //
  // public hiddenItem(id: string): void {
  //   this.galleryStateService.setHiddenItem(id);
  // }
  //
  // public clearToolbars(): void {
  //   this.galleryStateService.clearToolbars();
  // }
  //
  // public setToolBarStateByName(propName: string, isActive: boolean): void {
  //   this.galleryStateService
  //     .setToolBarStateByName(propName, isActive);
  // }
  //
  // public setModalState(isActive: boolean): void {
  //   this.galleryStateService.setModalState(isActive);
  // }
  //
  // public setDetailState(isActive: boolean): void {
  //   this.galleryStateService.setDetailState(isActive);
  // }
  //
  // public setCanvasState(isActive: boolean): void {
  //   this.galleryStateService.setCanvasState(isActive);
  // }
  //
  // public setCanvasSource(source: string): void {
  //   this.galleryStateService.setCanvasSource(source);
  // }
  //
  // public setTopbarType(type: string) {
  //   this.galleryStateService.setTopbarType(type);
  // }
}
