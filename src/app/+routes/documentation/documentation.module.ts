import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GxeDocumentationComponent } from './documentation.component';


export const DECLARATIONS_EXPORTS = [GxeDocumentationComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...DECLARATIONS_EXPORTS],
  exports: [...DECLARATIONS_EXPORTS]
})
export class GxeDocumentationModule { }
