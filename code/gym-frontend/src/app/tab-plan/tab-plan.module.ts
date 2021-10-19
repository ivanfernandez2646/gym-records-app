import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPlanPageRoutingModule } from './tab-plan-routing.module';

import { TabPlanPage } from './tab-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPlanPageRoutingModule
  ],
  declarations: [TabPlanPage]
})
export class TabPlanPageModule {}
