import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UxeGallery } from '../../uxe-gallery.model';

import { Router } from '@angular/router';
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
  animations: [],
})
export class UxeGalleryMasterComponent implements OnInit {

  private hostEl: any;
  @Input() state: any;
  @ViewChild('container') private containerEl: any;
  public collection = DATA;

  constructor(private store: Store<State>,
              private galleryStateService: UxeGalleryStateService,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private overlayService: OverlayService,
              private posService: PositionalService,
              private router: Router) {
  }

  ngOnInit() {
    this.setHostElement();
  }

  public closeDetails() {
    this.galleryStateService.setDetailState(false);
  }

  public setHostElement() {
    // TODO (mharwood) call this again on window.resize.
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
  }

  public selectedItem(item: number,
                      outerMask: any,
                      innerMask: any,
                      imgEl: any) {
    this.galleryStateService.openDetailView(item);
    console.log(imgEl.getBoundingClientRect());
    const ref = this.overlayService.open();
    this.posService.set(item, this.hostEl, outerMask, innerMask, imgEl, ref);
  }

  public setSelectedItem(item: number): void {
    this.galleryStateService.setSelectedItem(item);
  }
  //
  public hiddenItem(id: string): void {
    this.galleryStateService.setHiddenItem(id);
  }

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
  public setModalState(isActive: boolean): void {
    this.galleryStateService.setModalState(isActive);
  }

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
