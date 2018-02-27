import { OverlayRef } from '@angular/cdk/overlay';
import { ItemComponent } from '../../containers/uxe-animation-portal/item.component';

export class ItemOverlayRef {
  public componentInstance: ItemComponent;
  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
