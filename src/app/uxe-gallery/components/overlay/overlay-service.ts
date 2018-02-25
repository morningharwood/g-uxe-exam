// https://blog.thoughtram.io/angular/2017/11/20/custom-overlays-with-angulars-cdk.html
// Each property can be overridden by the consumer
import {
  Overlay,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Vector2 } from '../../../gxe-gallery/interfaces/vector.interface';
import { ItemComponent } from '../item/item.component';
import {
  ItemOverlayRef,
} from './item-overlay-ref';


interface GalleryOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: GalleryOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
};

@Injectable()
export class OverlayService {

  constructor(private overlay: Overlay) {}
  open(config: GalleryOverlayConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(ItemComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
    const ref = new ItemOverlayRef(overlayRef);

    // Observable to close on backdrop click.
    overlayRef.backdropClick().subscribe(_ => ref.close());

    // Instantiate remote control and return remote control.
    return ref;
  }

  private createOverlay(config: GalleryOverlayConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: GalleryOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
