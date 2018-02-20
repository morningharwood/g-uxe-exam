import { ElementRef } from '@angular/core';


export interface CurrentItem {
  hostEl: ElementRef;
  mask: ElementRef;
  index: number;
  x: number;
  y: number;
}
