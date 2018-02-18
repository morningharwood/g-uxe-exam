import { Injectable } from '@angular/core';


@Injectable()
export class SwipeVerticalService {
  public hammertime: HammerManager;

  constructor() {
  }

  public bootstrap(el): HammerManager {
    this.hammertime = new Hammer(el, {});
    this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    return this.hammertime;
  }

  public turnOffSwipe(): void {
    this.hammertime.get('swipe').reset();
  }
}
