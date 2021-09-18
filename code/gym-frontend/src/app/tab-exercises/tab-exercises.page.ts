import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { CreateExerciseModalComponent } from './modals/create-exercise-modal/create-exercise-modal.component';
import { MarksExerciseModalComponent } from './modals/marks-exercise-modal/marks-exercise-modal.component';

@Component({
  selector: 'app-tab-exercises',
  templateUrl: 'tab-exercises.page.html',
  styleUrls: ['tab-exercises.page.scss'],
})
export class TabExercises implements OnInit {
  exercises$: Observable<Exercise[]>;

  @Input()
  loggedUser: User;

  constructor(
    private exerciseService: ExerciseService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.exercises$;
    this.exerciseService.loadExercises();
  }

  deleteExercise($event: MouseEvent, id: string): void {
    if ($event) {
      $event.stopPropagation();
    }
    this.exerciseService.delete(id);
  }

  async createUpdateExerciseModal($event?: MouseEvent, exercise?: Exercise) {
    if ($event) {
      $event.stopPropagation();
    }
    const modal = await this.modalController.create({
      component: CreateExerciseModalComponent,
      componentProps: {
        exercise: exercise,
        isUpdate: !!exercise,
      },
    });
    return await modal.present();
  }

  async marksForExerciseModal(exercise: Exercise) {
    const modal = await this.modalController.create({
      component: MarksExerciseModalComponent,
    });
    return await modal.present();
  }
}
