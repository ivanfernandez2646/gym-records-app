import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabExercises } from './tab-exercises.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabExercisesPageRoutingModule } from './tab-exercises-routing.module';
import { CreateExerciseModalComponent } from './modals/create-exercise-modal/create-exercise-modal.component';
import { MarksExerciseModalComponent } from './modals/marks-exercise-modal/marks-exercise-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabExercisesPageRoutingModule,
  ],
  declarations: [
    TabExercises,
    CreateExerciseModalComponent,
    MarksExerciseModalComponent,
  ],
})
export class Tab1PageModule {}
