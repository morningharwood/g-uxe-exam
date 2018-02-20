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
  @Input() public isModalActive: string;
  @Input() public items: any;
  @Input() public currentIndex: number;
  @Input() public tapped: boolean;
  public name: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.currentIndex >= 0 && this.isModalActive) {
      this.name = this.items[ this.currentIndex ][ 0 ].value;
    } else {
      this.name = null;
    }
  }


}
