import { Component, OnInit } from '@angular/core';
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
export class CreateExerciseModalComponent implements OnInit {
  exercise: Exercise;
  isUpdate: boolean;
  muscleEnum: string[] = enumToArrayOfValues(MuscleEnum);

  constructor(
    private modalController: ModalController,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    if (!this.isUpdate) {
      this.exercise = {};
    }
  }

  formSubmit(): void {
    if (this.isUpdate) {
      this.exerciseService.update(this.exercise._id, this.exercise);
    } else {
      this.exerciseService.create(this.exercise);
    }
    this.dismiss();
  }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
