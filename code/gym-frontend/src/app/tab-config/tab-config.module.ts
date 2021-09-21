import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabConfigPage } from './tab-config.page';
import { TabConfigPageRoutingModule } from './tab-config-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabConfigPage }]),
    TabConfigPageRoutingModule,
  ],
  declarations: [TabConfigPage],
})
export class TabConfigPageModule {}
