import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mh-disclaimer',
  template: '<p [innerHTML]="where"></p>',
  styleUrls: ['./component.scss'],
})
export class DisclaimerComponent implements OnInit {

  @Input() public where: string;

  public ngOnInit(): void {

    this.where = this.where
        .replace(/\&(.*?)\;/g, '<sup>&$1;</sup>');
  }
}
