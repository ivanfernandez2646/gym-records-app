import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabExercises } from './tab-exercises.page';

const routes: Routes = [
  {
    path: '',
    component: TabExercises,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabExercisesPageRoutingModule {}
