import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-standard-list',
  templateUrl: './component.html',
  styleUrls: ['../shared-styles.scss', './component.scss'],
})
export class StandardListComponent {
  @Input() public title: string;
  @Input() public data: any;
}
