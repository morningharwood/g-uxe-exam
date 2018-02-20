import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-rich-list',
  templateUrl: './component.html',
  styleUrls: ['../shared-styles.scss', './component.scss'],
})
export class StandardRichComponent {
  @Input() public title: string;
  @Input() public data: any;
}
