import { OverlayRef } from '@angular/cdk/overlay';
import { ItemComponent } from '../../containers/uxe-animation-portal/item.component';


/**
 * Model class for creating an ItemOverlayRef.
 */
export class ItemOverlayRef {
  public componentInstance: ItemComponent;
  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
