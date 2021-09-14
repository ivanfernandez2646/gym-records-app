import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { CreateExerciseModalComponent } from './modals/create-exercise-modal/create-exercise-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  exercises$: Observable<Exercise[]>;

  @Input()
  loggedUser: User;

  constructor(
    private exerciseService: ExerciseService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.getExercises();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateExerciseModalComponent,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.write) {
      }
    });
    return await modal.present();
  }
}
