import { OverlayRef } from '@angular/cdk/overlay';

export class ItemOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
