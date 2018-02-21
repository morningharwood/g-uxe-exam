/**
 * @fileoverview Toolbar component controller.
 */

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  SEAMLESS_EASE,
  STANDARD_EASE,
} from '../../animations/ease.animations';


@Component({
  selector: 'gxe-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: [ './toolbars.component.scss' ],
  animations: [
    trigger('tappedToolbarBottom', [
      state('0', style({
        bottom: '-80px',
      })),
      state('1', style({
        bottom: '-1px',
      })),
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          bottom: '-1px',
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_EASE, style({
          bottom: '-80px',
        })),
      ]),
    ]),
    trigger('tappedToolbarTop', [
      state('0', style({
        top: '-80px',
      })),
      state('1', style({
        top: '0',
      })),
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          top: '0',
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_EASE, style({
          top: '-80px',
        })),
      ]),
    ]),
    trigger('switchToolbarBottom', [
      state('0', style({
        bottom: '-80px',
      })),
      state('1', style({
        bottom: '-1px',
      })),
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          bottom: '-1px',
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_EASE, style({
          bottom: '-80px',
        })),
      ]),
    ]),
    trigger('switchToolbarTop', [
      state('0', style({
        background: '#f7f7f7',
        color: '#333333',
      })),
      state('1', style({
        background: '#333333',
        color: '#f7f7f7',
      })),
      transition('0 => 1', [
        animate(SEAMLESS_EASE, style({
          background: '#333333',
          color: '#f7f7f7',
        })),
      ]),
      transition('1 => 0', [
        animate(SEAMLESS_EASE, style({
          background: '#f7f7f7',
          color: '#333333',
        })),
      ]),
    ]),
  ],
})
export class ToolbarsComponent implements OnInit, OnChanges {
  /**
   * Whether gallery-detail modal state open.
   */
  @Input() public isModalActive: boolean;

  /**
   * Item data used for name on top bar.
   */
  @Input() public items: any;

  /**
   * Current selected gallery-item
   */
  @Input() public currentIndex: number;

  /**
   * State of gallery-item being tapped.
   */
  @Input() public tapped: boolean;

  /**
   * Current selected item name to put in top bar template.
   */
  public name: string;

  constructor() {
  }

  public ngOnInit(): void {
  }

  ngOnChanges() {
    this.setName();
  }

  /**
   * Sets name
   */
  private setName() {
    if (this.currentIndex >= 0 && this.isModalActive) {
      this.name = this.items[ this.currentIndex ][ 0 ].value;
    } else {
      this.name = null;
    }
  }
}
