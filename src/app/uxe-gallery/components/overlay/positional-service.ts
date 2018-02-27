import {
  Injectable,
} from '@angular/core';
import { isNull } from 'lodash';
import { Vector2 } from '../../../gxe-gallery/interfaces/vector.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


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
  private messageSource = new BehaviorSubject<string>('');
  public currentMessage = this.messageSource.asObservable();

  public static getCenterY({ offsetHeight: parentHeight }, { offsetHeight: childHeight }): Vector2 {
    return {
      x: 0,
      y: (parentHeight - childHeight) / 2,
    };
  }

  public set(index, innerMask, ref, hostEl) {
    this.hostEl = hostEl;
    this.innerMask = innerMask;
    this.ref = ref;
    this.setMove(index);
  }

  public setMove(index) {
    this.cacheValues(index);

    this.move = {
      from: this.outerMask,
      to: {
        x: index % 2 ? -(this.outerMask.width / 2) : (this.outerMask.width / 2),
        y: this.imgEl.center.y,
      },
    };
  }

  private cacheValues(index) {
    if (isNull(index)) return;
    this.outerMask = this.queryParent[ index ];
    this.imgEl = this.queryImgs[ index ];
    this.changeMessage(this.imgEl.imgSrc)
  }

  public changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
