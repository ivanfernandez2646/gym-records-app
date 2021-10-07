import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LoaderService } from 'src/app/services/loader.service';
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
    private exerciseService: ExerciseService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    if (!this.isUpdate) {
      this.exercise = { isMonitorized: false };
    }
  }

  formSubmit(): void {
    if (this.isUpdate) {
      this.loaderService.showLoader('Updating exercise...');
      this.exerciseService.update(this.exercise._id, this.exercise);
    } else {
      this.loaderService.showLoader('Creating exercise...');
      this.exerciseService.create(this.exercise);
    }
    this.dismiss(true);
  }

  dismiss(isActionPerformed: boolean = false): void {
    this.modalController.dismiss(isActionPerformed);
  }
}
