import { OverlayRef } from '@angular/cdk/overlay';
import { ItemComponent } from '../item/item.component';

export class ItemOverlayRef {
  public componentInstance: ItemComponent;
  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
