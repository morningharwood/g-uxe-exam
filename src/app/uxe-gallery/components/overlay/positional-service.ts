import { Injectable } from '@angular/core';
import { Vector2 } from '../../../gxe-gallery/interfaces/vector.interface';
import { OverlayService } from './overlay-service';


@Injectable()
export class PositionalService {
  public hostEl: any;
  public outerMask: any;
  public innerMask: any;
  public imgEl: any;
  public move: any;
  public borderSize = 3;
  public ref: any;
  private static getCenterY({ offsetHeight: parentHeight }, { offsetHeight: childHeight }): Vector2 {
    return {
      x: 0,
      y: (parentHeight - childHeight) / 2,
    };
  }
  public set(index, hostEl, outerMask, innerMask, imgEl, ref) {
    this.hostEl = hostEl;
    this.outerMask = outerMask;
    this.innerMask = innerMask;
    this.imgEl = imgEl;
    this.ref = ref;
    const host = this.hostEl.getBoundingClientRect();
    const posA = outerMask.getBoundingClientRect();
    const posB = imgEl.getBoundingClientRect().y;
    const posC = PositionalService.getCenterY(this.hostEl, imgEl);

    this.move = {
      from: posA,
      to: {
        x: index % 2 ? -(posA.width / 2) : (posA.width / 2),
        y: posC.y,
      },
    };
  }
}
