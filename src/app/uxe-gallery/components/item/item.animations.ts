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
import { Router } from '@angular/router';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,

} from '../../../gxe-gallery/animations/ease.animations';
import { PositionalService } from '../overlay/positional-service';

const SUB_PIXELING = 1;
@Injectable()
export class ItemAnimationsService {
  public playerStart: AnimationPlayer;
  public playerEnd: AnimationPlayer;
  private playerInnerEnd: AnimationPlayer;
  private hostEl: any = '';
  private imgEl: any = '';

  constructor(private builder: AnimationBuilder,
              private posService: PositionalService,
              private router: Router) {

  }

  public endAnimate() {
    const offset = (this.posService.outerMask.height - this.posService.imgEl.height) / 2;
    this.itemAnimateItemEnd(offset, this.imgEl);
    this.itemAnimateEnd(this.posService.move, this.hostEl);
    this.hostEl = '';

    this.playerEnd.onDone(() => {
      this.posService.ref.inner.close();
    });
  }

  public itemAnimate(move, el, imgEl): void {
    this.cacheAnimateActors(el, imgEl);

    this.playerStart = this.builder.build([
      style({
        transform: `translate(${move.from.x}px, ${move.from.y}px)`,
        width: this.posService.outerMask.width,
        height: this.posService.outerMask.height,
      }),
      animate(
        STANDARD_EASE,
        style({
          transform:
            `translate(
              ${(this.posService.outerMask.width / 2) + SUB_PIXELING}px,
              ${move.to.y - ((this.posService.borderSize * 2) - SUB_PIXELING)}px) scale(2)
            `,
          height: this.posService.imgEl.height,
          width: this.posService.outerMask.width + 3,
        }),
      ),
    ]).create(el);

    this.playerStart.play();
    this.playerStart.onDone(() => {
      this.router.navigate([`/demo/detail/`]);
    });
  }

  public itemAnimateEnd(move, el): void {

    this.playerEnd = this.builder.build([
      style({
        transform:
          `translate(
              ${(this.posService.outerMask.width / 2) + this.posService.borderSize}px,
              ${move.to.y - Math.pow(this.posService.borderSize, 2)}px) scale(2)
            `,
        overflow: 'hidden',
        height: this.posService.imgEl.height,
        width: this.posService.outerMask.width,
        opacity: 1,
      }),
      animate(
        STANDARD_LEAVE,
        keyframes([
          style({
            transform: `translate(${move.from.x + 3}px, ${move.from.y + 3}px)`,
            height: this.posService.innerMask.offsetHeight,
            width: this.posService.innerMask.offsetWidth,
            overflow: 'hidden',
            opacity: 1,
            offset: .98,
          }),
          style({
            opacity: 0,
            offset: 1
          })
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
          transform: `translate(${-SUB_PIXELING}px, ${move}px)`,
        }),
      ),
    ]).create(el);
    this.playerInnerEnd.play();
  }

  public cacheAnimateActors(el: any, imgEl: any) {
    this.hostEl = el;
    this.imgEl = imgEl;
  }
}
