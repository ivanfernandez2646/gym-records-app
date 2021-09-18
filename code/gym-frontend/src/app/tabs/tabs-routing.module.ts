import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab-exercises',
        loadChildren: () =>
          import('../tab-exercises/tab-exercises.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab-config',
        loadChildren: () =>
          import('../tab-config/tab-config.module').then(
            (m) => m.TabConfigPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab-exercises',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab-exercises',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
