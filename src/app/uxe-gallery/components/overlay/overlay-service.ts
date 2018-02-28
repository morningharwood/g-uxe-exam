import {
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ItemComponent } from '../../containers/uxe-animation-portal/item.component';
import {
  ItemOverlayRef,
} from './item-overlay-ref';


/**
 * Interface that defines the GalleryOverlay Configuration.
 */
interface GalleryOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

/**
 * Default Overlay Configuration.
 * @type GalleryOverlayConfig
 */
const DEFAULT_CONFIG: GalleryOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
};

/**
 * Interface for Overlay Reference.
 */
interface OverlayReference {
  overlay: OverlayRef;
  inner: ItemOverlayRef;
}

/**
 * Using Angular CDK Overlay service to create an overlay animation between
 * Gallery Master state and gallery detail state.
 * https://blog.thoughtram.io/angular/2017/11/20/custom-overlays-with-angulars-cdk.html
 */
@Injectable()
export class OverlayService {
  /**
   * @param {Overlay} overlay Angular CDK Overlay Service.
   */
  constructor(private overlay: Overlay) {}

  /**
   * Public api to open an AngularCDK overlay.
   * @param {GalleryOverlayConfig} config
   * @returns OverlayReference
   */
  public open(config: GalleryOverlayConfig = {}): OverlayReference {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(ItemComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);
    const ref = new ItemOverlayRef(overlayRef);

    // Instantiate remote control and return remote control.
    return {
      overlay: overlayRef,
      inner: ref,
    };
  }

  /**
   * Private method to creates overlay.
   * @param {GalleryOverlayConfig} config Configuration of overlay.
   * @returns {OverlayRef} AngularCDK Overlay Reference.
   */
  private createOverlay(config: GalleryOverlayConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  /**
   * Private method to config Overlay.
   * @param {GalleryOverlayConfig} config Configuration of overlay.
   * @return {OverlayConfig} Angular CDK overlay configuration.
   */
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
