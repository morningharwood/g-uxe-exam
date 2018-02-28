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
import { isNil } from 'lodash';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,

} from '../../../gxe-gallery/animations/ease.animations';
import {
  ImgEl,
  Move,
  PositionalService,
} from '../../services/positional-service';


const SUB_PIXELING = 1;

@Injectable()
export class ItemAnimationsService {
  /**
   * Mask starting Animation player.
   */
  public playerStart: AnimationPlayer;

  /**
   * Mask ending Animation player.
   */
  public playerEnd: AnimationPlayer;

  /**
   * Inner image ending Animation player.
   */
  private playerInnerEnd: AnimationPlayer;

  /**
   * Host HTMLElement.
   */
  private hostEl: HTMLElement;

  /**
   * Inner image HTMLElement.
   */
  private imgEl: HTMLElement;

  /**
   * @param builder Angular animations programmatic builder.
   * @param posService Service manager for positional state.
   * @param router Angular Router service.
   */
  constructor(private builder: AnimationBuilder,
              private posService: PositionalService,
              private router: Router) {

  }

  /**
   * Public animation handler for overlay being closed.
   */
  public endAnimate() {
    if (isNil(this.posService.outerMask)) return;
    const offset = (this.posService.outerMask.height - this.posService.imgEl.height) / 2;
    this.itemAnimateItemEnd(offset, this.imgEl);
    this.itemAnimateEnd(this.posService.move, this.hostEl);
    this.hostEl = null;

    this.playerEnd.onDone(() => {
      this.posService.ref.inner.close();
    });
  }

  /**
   * Animates a host element forward between two states.
   * @param {Move} move Positional move data.
   * @param {HTMLElement} el Element to animate.
   * @param {ImgEl} imgEl Calculated state about inner Image element.
   */
  public itemAnimate(move: Move, el: HTMLElement, imgEl: ImgEl): void {
    this.cacheAnimateActors(el, imgEl);
    const x = ((window.innerWidth) - this.posService.imgEl.width - Math.pow(this.posService.borderSize, 2)) / 2;
    const y = ((window.innerHeight) - this.posService.imgEl.height - Math.round(this.posService.imgEl.height / 12)) / 2;
    this.playerStart = this.builder.build([
      style({
        transformOrigin: `50% 50%`,
        transform: `translate(${move.from.x}px, ${move.from.y}px)`,
        width: this.posService.outerMask.width,
        height: this.posService.outerMask.height,
      }),
      animate(
        STANDARD_EASE,
        keyframes([
          style({
            transformOrigin: `50% 50%`,
            transform: `translate(${x}px,${y}px) scale(2)`,
            height: this.posService.imgEl.height + 3,
            width: this.posService.outerMask.width + 3,
            opacity: 1,
            offset: 1
          }),
        ])
      ),
    ]).create(el);

    this.playerStart.play();
    this.playerStart.onDone(() => {
      this.router.navigate([ `/demo/detail/` ]);
    });
  }

  /**
   * Animates a host element backwards between two states.
   * @param {Move} move Positional move data.
   * @param {HTMLElement} el Element to animate.
   */
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
            offset: 1,
          }),
        ]),
      ),
    ]).create(el);
    this.playerEnd.play();
  }

  /**
   * Animates the inner image of back to default state.
   * @param {Move} move Positional move data.
   * @param {HTMLElement} el Element to animate.
   */
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
