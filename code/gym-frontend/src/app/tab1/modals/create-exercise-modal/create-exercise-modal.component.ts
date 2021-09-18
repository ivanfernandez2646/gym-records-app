import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { enumToArrayOfValues } from 'src/app/utils/GenericUtils';
import { MuscleEnum } from 'src/app/utils/MuscleEnum';

@Component({
  selector: 'app-create-exercise-modal',
  templateUrl: './create-exercise-modal.component.html',
  styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent {
  exercise: Exercise = {};
  muscleEnum: string[] = enumToArrayOfValues(MuscleEnum);

  constructor(
    private modalController: ModalController,
    private exerciseService: ExerciseService
  ) {}

  formSubmit(): void {
    this.exerciseService.create(this.exercise);
    this.dismiss();
  }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
