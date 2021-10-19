import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TabPlanPageRoutingModule } from './tab-plan-routing.module';
import { TabPlanPage } from './tab-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPlanPageRoutingModule,
    PdfViewerModule,
  ],
  declarations: [TabPlanPage],
})
export class TabPlanPageModule {}
