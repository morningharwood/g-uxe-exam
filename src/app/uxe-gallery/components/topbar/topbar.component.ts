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
  OnInit,
} from '@angular/core';
import { isNil } from 'lodash';
import { PositionalService } from '../../services/positional-service';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
} from '../../animations/ease.animations';
import { GalleryItem } from '../../interfaces/gallery-items.interface';


@Component({
  selector: 'uxe-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: [ './topbar.component.scss' ],
  animations: [
    trigger('enterBar', [
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
        animate(STANDARD_LEAVE, style({
          top: '-80px',
        })),
      ]),
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  /**
   * Input of animationState from store.
   */
  @Input() public animationState: any;

  /**
   * Input of gallery items from API.
   */
  @Input() public galleryItems: Array<Array<GalleryItem>>;

  /**
   * Name field to be shown on template.
   */
  public name: string;

  /**
   * @param {PositionalService} posService Positional service.
   */
  constructor(private posService: PositionalService) {
  }

  public ngOnInit(): void {
    this.posService.currentMessage.subscribe((message) => {
      this.setName(message[1]);
    });
  }

  /**
   * Sets the name for topbar from selected item of galleryItems.
   * @param {number} index Current selected Index.
   */
  public setName(index: number): void  {
    if (isNil(index)) return;
    this.name = this.galleryItems[index][ 0 ].value;
  }
}
