import { Injectable } from '@angular/core';


@Injectable()
export class SwipeVerticalService {
  public hammertime: HammerManager;

  constructor() {
  }

  public bootstrap(el): HammerManager {
    this.hammertime = new Hammer(el, {});
    this.swipeOn();
    return this.hammertime;
  }

  public swipeOn(): void {
    this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  }

  public swipeOff(): void {
    this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
  }
}
