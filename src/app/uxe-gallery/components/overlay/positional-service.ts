import {
  Injectable,
} from '@angular/core';
import { Vector2 } from '../../../gxe-gallery/interfaces/vector.interface';


@Injectable()
export class PositionalService {
  public hostEl: any;
  public outerMask: any;
  public innerMask: any;
  public imgEl: any;
  public move: any;
  public borderSize = 3;
  public ref: any;
  public queryParent: any;
  public queryImgs: any;

  public static getCenterY({ offsetHeight: parentHeight }, { offsetHeight: childHeight }): Vector2 {
    return {
      x: 0,
      y: (parentHeight - childHeight) / 2,
    };
  }

  public pluckElements(index) {
    return {
      outerMask: this.queryParent._results[ index ].nativeElement,
      imgEl: this.queryImgs._results[ index ].nativeElement,
    };
  }

  public set(index, innerMask, ref, hostEl) {
    const { outerMask, imgEl } = this.pluckElements(index);
    this.hostEl = hostEl;
    this.imgEl = imgEl;

    console.log(
      this.hostEl.offsetHeight,
      this.imgEl.offsetHeight
    );

    this.outerMask = outerMask;
    this.innerMask = innerMask;
    this.ref = ref;
    const posA = outerMask.getBoundingClientRect();
    const posC = PositionalService.getCenterY(this.hostEl, this.imgEl);

    this.move = {
      from: posA,
      to: {
        x: index % 2 ? -(posA.width / 2) : (posA.width / 2),
        y: posC.y,
      },
    };
  }
}
