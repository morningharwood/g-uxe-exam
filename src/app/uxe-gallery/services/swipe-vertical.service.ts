/**
 * @fileoverview HammerJS singleton service.
 */
import { Injectable } from '@angular/core';


@Injectable()
export class SwipeVerticalService {
  public hammertime: HammerManager;

  constructor() {
  }

  /**
   * Creates an instance of Hammer.
   * @description Swipe vertically must be turned off on master view. A single instance
   *    affords this opportunity.
   */
  public bootstrap(el: HTMLElement): HammerManager {
    this.hammertime = new Hammer(el, {});
    this.swipeOn();
    return this.hammertime;
  }

  /**
   * Turns on vertical swiping.
   */
  public swipeOn(): void {
    this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  }

  /**
   * Turns off vertical swiping.
   */
  public swipeOff(): void {
    this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
  }
}
