import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
  keyframes,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
  STANDARD_LONG,
} from '../../../gxe-gallery/animations/ease.animations';

import { PositionalService } from '../overlay/positional-service';
import { UxeGalleryStateService } from '../../services/gallery-service';


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

  constructor(private builder: AnimationBuilder,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private posService: PositionalService,
              private galleryStateService: UxeGalleryStateService) {
  }

  ngOnInit() {
    this.itemAnimate(this.posService.move, this.renderer.selectRootElement(this.ngHostEl).nativeElement);
    this.imgSrc = this.posService.imgEl.src;

    this.posService.ref.overlay.backdropClick().subscribe(_ => {
      this.galleryStateService.setModalState(false);
      this.endAnimate();
      this.playerEnd.onDone(() => {
        this.posService.ref.inner.close();
      });
    });

  }

  public endAnimate() {
    const offset = (this.posService.outerMask.offsetHeight - this.innerImg.nativeElement.offsetHeight) / 2;
    this.itemAnimateItemEnd(offset, this.innerImg.nativeElement);
    this.itemAnimateEnd(this.posService.move, this.renderer.selectRootElement(this.ngHostEl).nativeElement);
  }

  private itemAnimate(move, el): void {

    console.log(this.posService.imgEl.offsetHeight);
    this.playerStart = this.builder.build([
      style({
        transform: `translate3d(${move.from.x}px, ${move.from.y}px, 0px)`,
        width: this.posService.outerMask.offsetWidth,
        height: this.posService.outerMask.offsetHeight,
      }),
      animate(
        STANDARD_EASE,
        style({
          transform:
            `translate3d(
              ${(this.posService.outerMask.offsetWidth / 2) + this.posService.borderSize}px,
              ${move.to.y - (this.posService.borderSize * 2)}px, 1px) scale(2)
            `,
          height: this.posService.imgEl.offsetHeight,
          width: this.posService.outerMask.offsetWidth + (this.posService.borderSize * 2),
        }),
      ),
    ]).create(el);

    this.playerStart.play();
  }

  private itemAnimateEnd(move, el): void {
    this.playerEnd = this.builder.build([
      style({
        transform:
          `translate3d(
              ${(this.posService.outerMask.offsetWidth / 2) + this.posService.borderSize}px,
              ${move.to.y - (this.posService.borderSize * 2)}px, 1px) scale(2)
            `,
        height: this.posService.imgEl.offsetHeight + (this.posService.borderSize * 2),
        width: this.posService.outerMask.offsetWidth + (this.posService.borderSize * 2),
        overflow: 'hidden',
      }),
      animate(
        STANDARD_LEAVE,
        keyframes([
          style({
            transform: `translate3d(${move.from.x + 3}px, ${move.from.y + 3}px, 0px)`,
            width: this.posService.outerMask.offsetWidth - (this.posService.borderSize * 2),
            height: this.posService.outerMask.offsetHeight - (this.posService.borderSize * 2),
            overflow: 'hidden',
            offset: 1,
          }),
        ]),
      ),
    ]).create(el);
    this.playerEnd.play();
  }

  private itemAnimateItemEnd(move, el): void {
    this.playerInnerEnd = this.builder.build([
      animate(
        STANDARD_LEAVE,
        keyframes([
          style({
            transform: `translateY(${move}px)`,
            opacity: 1,
            offset: .99
          }),
          style([{
            opacity: 0,
            offset: 1
          }
          ])
        ])
      ),
    ]).create(el);
    this.playerInnerEnd.play();
  }

}
