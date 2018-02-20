import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mh-profile-fab',
  templateUrl: 'component.html',
  styleUrls: ['./component.scss']
})
export class FabButtonComponent implements OnInit {
 constructor() { }

 ngOnInit() { }

  public scroll(): void {
    window.scrollTo(0, window.innerHeight);
  }
}
