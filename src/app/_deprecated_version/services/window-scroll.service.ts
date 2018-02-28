/**
 * @fileoverview Disable & enable body scroll service.
 */

import { Injectable } from '@angular/core';



@Injectable()
export class WindowScrolling {

  private styleTag: HTMLStyleElement;

  /**
   * Initialize the window-scrolling service.
   */
  constructor() {

    /**
     * Directly overwriting the style of the BODY tag,
     * inject a STYLE element that overrides the scroll behavior. This
     * way we can add and remove the style in order to toggle the behavior.
     */
    this.styleTag = this.buildStyleElement();

  }

  /**
   * Disable the scrolling feature on the main viewport.
   */
  public disable(): void {

    document.body.appendChild(this.styleTag);

  }


  /**
   * Re-enable the scrolling feature on the main viewport.
   */
  public enable(): void {
    document.body.removeChild(this.styleTag);
  }

  /**
   * build and return a Style element that will prevent scrolling on the body.
   */
  private buildStyleElement(): HTMLStyleElement {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('data-debug', 'Injected by WindowScrolling service.');
    style.textContent = `
      body {
          overflow: hidden !important ;
      }
    `;
    return (style);
  }

}
