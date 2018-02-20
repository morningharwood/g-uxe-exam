import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-visited-list',
  templateUrl: './component.html',
  styleUrls: ['../shared-styles.scss', './component.scss'],
})
export class VisitedListComponent {
  @Input() public title: string;
  @Input() public data: any;
}
