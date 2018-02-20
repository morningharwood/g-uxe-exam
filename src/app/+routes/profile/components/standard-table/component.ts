import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-standard-table',
  templateUrl: './component.html',
  styleUrls: ['../shared-styles.scss', './component.scss'],
})
export class StandardTableComponent {
  @Input() public title: string;
  @Input() public data: any;

}
