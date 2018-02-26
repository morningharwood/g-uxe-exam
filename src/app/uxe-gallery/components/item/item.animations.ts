import {
  animate,
  keyframes,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Injectable,
} from '@angular/core';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
} from '../../../gxe-gallery/animations/ease.animations';
import { PositionalService } from '../overlay/positional-service';


@Injectable()
export class ItemAnimationsService {
  private playerStart: AnimationPlayer;
  private playerEnd: AnimationPlayer;
  private playerInnerEnd: AnimationPlayer;
  private hostEl: any = '';
  private imgEl: any = '';
  constructor(private builder: AnimationBuilder,
              private posService: PositionalService) {

  }

  public endAnimate(innerImg = this.imgEl, hostEl = this.hostEl) {
    console.log(this.hostEl);
    const offset = (this.posService.outerMask.offsetHeight - innerImg.offsetHeight) / 2;
    this.itemAnimateItemEnd(offset, innerImg);
    this.itemAnimateEnd(this.posService.move, hostEl);
    this.hostEl = '';

    this.playerEnd.onDone(() => {
      this.posService.ref.inner.close();
    });
  }

  public itemAnimate(move, el, imgEl): void {
    this.hostEl = el;
    this.imgEl = imgEl;
    this.playerStart = this.builder.build([
      style({
        transform: `translate(${move.from.x}px, ${move.from.y}px)`,
        width: this.posService.outerMask.offsetWidth,
        height: this.posService.outerMask.offsetHeight,
      }),
      animate(
        STANDARD_EASE,
        style({
          transform:
            `translate(
              ${(this.posService.outerMask.offsetWidth / 2)}px,
              ${move.to.y - Math.pow(this.posService.borderSize, 2)}px) scale(2)
            `,
          height: this.posService.imgEl.offsetHeight,
          width: this.posService.outerMask.offsetWidth,
        }),
      ),
    ]).create(el);

    this.playerStart.play();
  }

  public itemAnimateEnd(move, el): void {
    this.playerEnd = this.builder.build([
      style({
        transform:
          `translate(
              ${(this.posService.outerMask.offsetWidth / 2) + this.posService.borderSize}px,
              ${move.to.y - Math.pow(this.posService.borderSize, 2)}px) scale(2)
            `,
        height: this.posService.imgEl.offsetHeight,
        width: this.posService.outerMask.offsetWidth,
      }),
      animate(
        STANDARD_LEAVE,
        keyframes([
          style({
            transform: `translate(${move.from.x + 3}px, ${move.from.y + 3}px)`,
            height: this.posService.outerMask.offsetHeight,
            width: this.posService.outerMask.offsetWidth,
            overflow: 'hidden',
            offset: 1,
          }),
        ]),
      ),
    ]).create(el);
    this.playerEnd.play();
  }

  public itemAnimateItemEnd(move, el): void {
    this.playerInnerEnd = this.builder.build([
      animate(
        STANDARD_LEAVE,
        style({
          transform: `translateY(${move}px)`,
        }),
      ),
    ]).create(el);
    this.playerInnerEnd.play();
  }

  public setAnimationWatchers() {
    // this.playerStart.onDone(() => {
    //   this.galleryStateService.setDetailState(true);
    //   this.galleryStateService.setModalState(true);
    // });
  }
}
