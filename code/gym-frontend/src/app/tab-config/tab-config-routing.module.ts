import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabConfigPage } from './tab-config.page';

const routes: Routes = [
  {
    path: '',
    component: TabConfigPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabConfigPageRoutingModule {}
