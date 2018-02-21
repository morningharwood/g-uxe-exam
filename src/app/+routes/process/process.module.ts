import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MainNavigationModule } from '../../_other/main-navigation/main-navigation.module';
import {
  GxeProcessComponent,
} from './process.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    RouterModule,
    MainNavigationModule,
  ],
  declarations: [GxeProcessComponent],
  exports: [GxeProcessComponent]
})
export class GxeProcessModule { }
