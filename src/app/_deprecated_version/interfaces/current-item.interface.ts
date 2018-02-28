/**
 * Payload passed from children to parent for animations.
 */
export interface CurrentItem {
  hostEl: HTMLElement;
  mask: HTMLElement;
  index: number;
  x: number;
  y: number;
}
