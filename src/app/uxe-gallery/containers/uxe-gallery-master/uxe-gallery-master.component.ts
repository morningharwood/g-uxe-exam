import {

  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
// import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// import * as fromUxeGallery from '../../reducers/uxe-gallery.reducer';
import { UxeGallery } from '../../uxe-gallery.model';

import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  select,
  Store,
} from '@ngrx/store';
import { STANDARD_EASE } from '../../../gxe-gallery/animations/ease.animations';
import { selectAll, selectFeatureExtended, State } from '../../reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from '../../services/gallery-service';
import { Vector2 } from '../../../gxe-gallery/interfaces/vector.interface';

export enum AnimationState {
  START = 'start',
  END = 'end',
}

@Component({
  selector: 'uxe-gallery-master',
  templateUrl: './uxe-gallery-master.component.html',
  styleUrls: ['./uxe-gallery-master.component.scss'],
  animations: [

  ]
})
export class UxeGalleryMasterComponent implements OnInit {
  private obs: Observable<UxeGallery[]>;
  private obsExtended: Observable<any>;
  private playerStart: AnimationPlayer;
  private hostEl: any;
  @ViewChild('container') private containerEl: any;
  private flexWidth: string;
  private static getCenterY({offsetHeight: parentHeight}, {offsetHeight: childHeight} ): Vector2 {
    return {
      x: 0,
      y: (parentHeight - childHeight) / 2,
    };
  }

  constructor(
    private store: Store<State>,
    private galleryStateService: UxeGalleryStateService,
    private builder: AnimationBuilder,
    private ngHostEl: ElementRef,
    private renderer: Renderer2) { }

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

  public selectedItem(item: UxeGallery,
                      outerMask: any,
                      innerMask: any,
                      imgEl: any ) {
    this.setSelectedItem(item);
    this.setModalState(true);

    const host = this.hostEl.getBoundingClientRect();
    const posA = outerMask.getBoundingClientRect();
    const posB = imgEl.getBoundingClientRect().y;
    const posC = UxeGalleryMasterComponent.getCenterY(this.hostEl, imgEl);
    const move = {
      from: posA,
      to: {
        x: posC.x - posA.x,
        y: posC.y - posA.y
      },
    };
    // console.log(posA.x, posA.y, posB, posC);
    // Host will give you the animation end position with centerImageY
    // outerMask will give you starting position.
    // innerMask is the animation element
    // imgEl will give you the height animation values
    // Animate the image from center to topleft
    this.itemAnimate(move, outerMask);
    // When animations complete redirect to detail
  }


  // Animation start

  private itemAnimate(move, el): void {
    this.playerStart = this.builder.build([
      style({
        transform: `translate3d(${move.from.x}px, ${move.from.y}px, 0px)`,
      }),
      animate(
        STANDARD_EASE,
        style({
          position: 'fixed',
          transform: `translate3d(${move.to.x}px, ${move.to.y}px, 2px) scale(2)`,
          flexBasis: '100%',
          maxWidth: '100%'
        }),
      ),
    ]).create(el);

    this.playerStart.play();
  }

  public setSelectedItem(item: UxeGallery): void {
    this.galleryStateService.setSelectedItem(item);
  }

  public hiddenItem(id: string): void {
    this.galleryStateService.setHiddenItem(id);
  }

  public clearToolbars(): void {
    this.galleryStateService.clearToolbars();
  }

  public setToolBarStateByName(propName: string, isActive: boolean): void {
    this.galleryStateService
      .setToolBarStateByName(propName, isActive);
  }

  public setModalState(isActive: boolean): void {
    this.galleryStateService.setModalState(isActive);
  }

  public setDetailState(isActive: boolean): void {
    this.galleryStateService.setDetailState(isActive);
  }

  public setCanvasState(isActive: boolean): void {
    this.galleryStateService.setCanvasState(isActive);
  }

  public setCanvasSource(source: string): void {
    this.galleryStateService.setCanvasSource(source);
  }

  public setTopbarType(type: string) {
    this.galleryStateService.setTopbarType(type);
  }
}
