import {
  Injectable,
} from '@angular/core';
import { isNil } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Vector2 } from '../interfaces/vector.interface';
import { ItemOverlayRef } from '../components/overlay/item-overlay-ref';


/**
 * Tuple to keep track of current imgSource and the currentIndex
 */
export type Message = [ string, number ];

/**
 * ClientRect is missing x,y extending default to make my own.
 */
export interface BoundingRect extends ClientRect, Vector2 {}

/**
 * Interface that manages the shape of data need to position the animations of
 * galleryItems.
 */
export interface Move {
  from: BoundingRect;
  to: Vector2;
}

/**
 * Interface to manage the data needed to animate the inner images of
 * a galleryItem.
 */
export interface ImgEl {
  center: Vector2;
  height: number;
  imgSrc: string;
  width: number;
}

/**
 * @description Service used to manage Positional state
 * of animations of galleryItems.
 */
@Injectable()
export class PositionalService {
  /**
   * Selected Host Element.
   */
  public hostEl: HTMLElement;

  /**
   * Selected OuterMask as ClientRect.
   */
  public outerMask: BoundingRect;

  /**
   * Selected InnerMask HTMLElement.
   */
  public innerMask: HTMLElement;

  /**
   * Calculated innerElement data.
   */
  public imgEl: ImgEl;

  /**
   * Positional animation data.
   */
  public move: Move;

  /**
   * Overlay reference.
   */
  public ref: any;

  /**
   * Query list of all positional data of Outermasks.
   */
  public queryParent: BoundingRect[];
  /**
   * Query list of calculated positional data of inner image elements.
   */
  public queryImgs: ImgEl[];

  /**
   * Default border size;
   */
  public borderSize = 3;

  /**
   * Private behaviorSubject to choreographic messages between components.
   * @type {BehaviorSubject<Message>}
   */
  private messageSource = new BehaviorSubject<Message>([
    '',
    null,
  ]);

  /**
   * Observable Tuple named Message for tracking index.
   */
  public currentMessage = this.messageSource.asObservable();

  /**
   * Currently selected index.
   */
  public index: number;

  /**
   * Finds the Y center point between a parent and a child element.
   * @param {HTMLElement} parentHeight ParentElement.
   * @param {HTMLElement} childHeight ChildElement.
   * @return {Vector2}
   */
  public static getCenterY({ offsetHeight: parentHeight }, { offsetHeight: childHeight }): Vector2 {
    return {
      x: 0,
      y: (parentHeight - childHeight) / 2,
    };
  }

  /**
   * Used to set and cache a reference to the selected galleryItem.
   * @param index Selected index of GalleryItem.
   * @param innerMask Innermask element of GalleryItem.
   * @param ref Reference to Overlay.
   * @param hostEl HostElement
   */
  public set(index: number, innerMask: HTMLElement, ref: any, hostEl: HTMLElement) {
    this.hostEl = hostEl;
    this.innerMask = innerMask;
    this.ref = ref;
    this.setMove(index);
  }

  /**
   * Set the public "move" value.
   * @param index Selected index of galleryItem.
   */
  public setMove(index: number) {
    this.cacheValues(index);
    if (isNil(this.outerMask) || isNil(this.imgEl)) return;
    this.move = {
      from: this.outerMask,
      to: {
        x: index % 2 ? -(this.outerMask.width / 2) : (this.outerMask.width / 2),
        y: this.imgEl.center.y,
      },
    };
  }

  /**
   * Caches selected galleryItem on change.
   * @param index
   */
  private cacheValues(index: number) {
    if (isNil(index)) return;
    this.outerMask = this.queryParent[ index ];
    this.imgEl = this.queryImgs[ index ];
    this.changeMessage([
      this.imgEl.imgSrc,
      index,
    ]);
  }

  /**
   * Public method to publish a message to messageSource.
   * @param {Message} message Keeps track of current imgEl.imgSrc,
   *    current index.
   */
  public changeMessage(message: Message) {
    this.messageSource.next(message);
  }
}
