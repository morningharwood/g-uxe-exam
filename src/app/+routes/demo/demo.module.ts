import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GxeDemoComponent } from './demo.component';


export const DECLARATIONS_EXPORTS = [GxeDemoComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...DECLARATIONS_EXPORTS],
  exports: [...DECLARATIONS_EXPORTS],
})
export class GxeDemoModule { }
