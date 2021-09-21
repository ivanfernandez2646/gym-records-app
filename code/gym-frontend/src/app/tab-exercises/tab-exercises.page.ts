import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { UserService } from '../services/user.service';
import { CreateExerciseModalComponent } from './modals/create-exercise-modal/create-exercise-modal.component';
import { MarksExerciseModalComponent } from './modals/marks-exercise-modal/marks-exercise-modal.component';

@Component({
  selector: 'app-tab-exercises',
  templateUrl: 'tab-exercises.page.html',
  styleUrls: ['tab-exercises.page.scss'],
})
export class TabExercises implements OnInit {
  exercises$: Observable<Exercise[]>;
  loggedUser: User;

  constructor(
    private exerciseService: ExerciseService,
    private modalController: ModalController,
    private userService: UserService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe((res) => (this.loggedUser = res));
    this.exercises$ = this.exerciseService.exercises$;
    this.exerciseService.loadExercises();
  }

  async deleteExercise($event: MouseEvent, exercise: Exercise): Promise<void> {
    if ($event) {
      $event.stopPropagation();
    }
    const alert = await this.alertController.create({
      header: 'Delete exercise',
      message: `You're going to delete ${exercise.name}. Are you sure?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            this.exerciseService.delete(exercise._id);
          },
        },
      ],
    });

    await alert.present();
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
      componentProps: {
        userId: this.loggedUser._id,
        exercise: exercise,
      },
    });
    return await modal.present();
  }
}
