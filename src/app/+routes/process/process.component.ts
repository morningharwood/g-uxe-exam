import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gxe-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class GxeProcessComponent implements OnInit {
  public panelOpenState = false;
  public engiOpen = true;
  constructor() { }

  ngOnInit() {
  }

  public open() {
    this.panelOpenState = true;
    window.scrollTo(0 , 0);
  }

  public close() {
    this.panelOpenState = false;
    window.scrollTo(0 , 0);
  }

}
