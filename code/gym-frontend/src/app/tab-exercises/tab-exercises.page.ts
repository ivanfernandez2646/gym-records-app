import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';
import { enumToArrayOfValues } from '../utils/GenericUtils';
import { MuscleEnum } from '../utils/MuscleEnum';
import { CreateExerciseModalComponent } from './modals/create-exercise-modal/create-exercise-modal.component';
import { MarksExerciseModalComponent } from './modals/marks-exercise-modal/marks-exercise-modal.component';

@Component({
  selector: 'app-tab-exercises',
  templateUrl: 'tab-exercises.page.html',
  styleUrls: ['tab-exercises.page.scss'],
})
export class TabExercises implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  loggedUser: User;
  muscleEnum: string[] = enumToArrayOfValues(MuscleEnum);

  filterSearchBar: string;
  filterMuscle: string;

  constructor(
    private exerciseService: ExerciseService,
    private modalController: ModalController,
    private userService: UserService,
    private alertController: AlertController,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe((res) => (this.loggedUser = res));
    this.exercises$ = this.exerciseService.exercises$;
    this.isLoading$ = this.loaderService.isLoading$;
    this.loaderService.showLoader('Loading exercises...').then(() => {
      this.exerciseService.loadExercises();
      this.exercises$.subscribe(() => {
        this.loaderService.hideLoader();
      });
    });
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
            this.loaderService.showLoader('Deleting exercise...');
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
    await modal.present();
  }

  async marksForExerciseModal(exercise: Exercise) {
    const modal = await this.modalController.create({
      component: MarksExerciseModalComponent,
      componentProps: {
        userId: this.loggedUser._id,
        exercise: exercise,
      },
    });
    await modal.present();
  }

  handleSearchBarInput($event?: any): void {
    const items: HTMLDivElement[] = Array.from(
      document.querySelector('ion-list').children
    ) as HTMLDivElement[];
    this.filterSearchBar = $event
      ? $event.target.value.toLowerCase()
      : this.filterSearchBar;
    requestAnimationFrame(() => {
      items.forEach((item) => {
        const shouldShow =
          item.textContent.toLowerCase().indexOf(this.filterSearchBar) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  selectChipMuscle($event?: MouseEvent): void {
    const items: HTMLDivElement[] = Array.from(
      document.querySelector('ion-list').children
    ) as HTMLDivElement[];
    this.filterMuscle = $event
      ? ($event.target as HTMLElement).innerText.toLowerCase()
      : this.filterMuscle;

    requestAnimationFrame(() => {
      items.forEach((item) => {
        const muscleOfItem = item.id.split('-').pop().toLowerCase();
        const shouldShow = muscleOfItem.indexOf(this.filterMuscle) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }
}
