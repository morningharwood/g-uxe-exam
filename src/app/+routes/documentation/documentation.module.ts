import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainNavigationModule } from '../../_other/main-navigation/main-navigation.module';
import { GxeDocumentationComponent } from './documentation.component';


export const DECLARATIONS_EXPORTS = [GxeDocumentationComponent];

@NgModule({
  imports: [
    CommonModule,
    MainNavigationModule,
  ],
  declarations: [...DECLARATIONS_EXPORTS],
  exports: [...DECLARATIONS_EXPORTS]
})
export class GxeDocumentationModule { }
