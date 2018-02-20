import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'mh-standard-block',
  templateUrl: './component.html',
  styleUrls: ['../shared-styles.scss', './component.scss'],
})
export class StandardBlockComponent implements OnInit {
  @Input() public title: string;
  @Input() public data: any;


  ngOnInit() {

  }
}
