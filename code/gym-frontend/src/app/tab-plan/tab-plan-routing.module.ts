import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPlanPage } from './tab-plan.page';

const routes: Routes = [
  {
    path: '',
    component: TabPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPlanPageRoutingModule {}
