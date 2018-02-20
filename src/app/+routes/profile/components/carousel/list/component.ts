import { Component, Input, OnInit } from '@angular/core';

import {timer as timerObs} from 'rxjs/observable/timer';

@Component({
  selector: 'mh-carousel-list',
  templateUrl: './component.html',
  styleUrls: ['../../shared-styles.scss', './component.scss'],
})
export class CarouselListComponent implements OnInit {
  @Input() public title: string;
  @Input() public data: any;
  @Input() public active = 0;
  @Input() public delay = 0;
  @Input() public interval? = 5500;

  public ngOnInit(): void {
    timerObs(this.delay, this.interval).subscribe(()=> {
      if (this.active < this.data.length -1) {
        ++this.active;
      } else {
        this.active = 0;
      }
    });
  }
}
