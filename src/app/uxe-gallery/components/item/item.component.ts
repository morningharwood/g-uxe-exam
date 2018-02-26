import {
  animate,
  keyframes,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  select,
  Store,
} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
} from '../../../gxe-gallery/animations/ease.animations';
import { UxeGalleryStateService } from '../../services/gallery-service';
import { PositionalService } from '../overlay/positional-service';
import { ItemAnimationsService } from './item.animations';


@Component({
  selector: 'uxe-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.scss' ],
})
export class ItemComponent implements OnInit {
  public playerStart: AnimationPlayer;
  public playerEnd: AnimationPlayer;
  private imgSrc: string;
  private playerInnerEnd: AnimationPlayer;
  @ViewChild('innerImg') private innerImg: any;
  private obsExtended: Observable<any>;
  private hostEl: any;

  constructor(private builder: AnimationBuilder,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private posService: PositionalService,
              private galleryStateService: UxeGalleryStateService,
              private animationService: ItemAnimationsService) {
  }

  ngOnInit() {
    this.setHostElement();
    this.imgSrc = this.posService.imgEl.src;
    this.animationService.itemAnimate(this.posService.move, this.hostEl);
  }
  private setHostElement() {
    // TODO (mharwood) call this again on window.resize.
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
  }

  public close() {
    this.animationService.endAnimate(
      this.innerImg.nativeElement,
      this.hostEl,
    );
    // this.playerEnd.onDone(() => {
    //   this.posService.ref.inner.close();
    // });
  }

  // public close() {
  //   this.endAnimate();
  //   this.playerEnd.onDone(() => {
  //     this.posService.ref.inner.close();
  //   });
  // }
  //
  // public endAnimate() {
  //   const offset = (this.posService.outerMask.offsetHeight - this.innerImg.nativeElement.offsetHeight) / 2;
  //   this.itemAnimateItemEnd(offset, this.innerImg.nativeElement);
  //   this.itemAnimateEnd(this.posService.move, this.renderer.selectRootElement(this.ngHostEl).nativeElement);
  // }
  //
  // private itemAnimate(move, el): void {
  //   this.playerStart = this.builder.build([
  //     style({
  //       transform: `translate(${move.from.x}px, ${move.from.y}px)`,
  //       width: this.posService.outerMask.offsetWidth,
  //       height: this.posService.outerMask.offsetHeight,
  //     }),
  //     animate(
  //       STANDARD_EASE,
  //       style({
  //         transform:
  //           `translate(
  //             ${(this.posService.outerMask.offsetWidth / 2)}px,
  //             ${move.to.y - Math.pow(this.posService.borderSize, 2)}px) scale(2)
  //           `,
  //         height: this.posService.imgEl.offsetHeight,
  //         width: this.posService.outerMask.offsetWidth,
  //       }),
  //     ),
  //   ]).create(el);
  //
  //   this.playerStart.play();
  // }
  //
  // private itemAnimateEnd(move, el): void {
  //   this.playerEnd = this.builder.build([
  //     style({
  //       transform:
  //         `translate(
  //             ${(this.posService.outerMask.offsetWidth / 2) + this.posService.borderSize}px,
  //             ${move.to.y - Math.pow(this.posService.borderSize, 2)}px) scale(2)
  //           `,
  //       height: this.posService.imgEl.offsetHeight,
  //       width: this.posService.outerMask.offsetWidth,
  //     }),
  //     animate(
  //       STANDARD_LEAVE,
  //       keyframes([
  //         style({
  //           transform: `translate(${move.from.x + 3}px, ${move.from.y + 3}px)`,
  //           height: this.posService.outerMask.offsetHeight,
  //           width: this.posService.outerMask.offsetWidth,
  //           overflow: 'hidden',
  //           offset: 1,
  //         }),
  //       ]),
  //     ),
  //   ]).create(el);
  //   this.playerEnd.play();
  // }
  //
  // private itemAnimateItemEnd(move, el): void {
  //   this.playerInnerEnd = this.builder.build([
  //     animate(
  //       STANDARD_LEAVE,
  //       style({
  //         transform: `translateY(${move}px)`,
  //       }),
  //     ),
  //   ]).create(el);
  //   this.playerInnerEnd.play();
  // }
  //
  // private setAnimationWatchers() {
  //   // this.playerStart.onDone(() => {
  //   //   this.galleryStateService.setDetailState(true);
  //   //   this.galleryStateService.setModalState(true);
  //   // });
  // }
}
