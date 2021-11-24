import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonChip,
  IonContent,
  IonList,
  ModalController,
} from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { CRUDAction, enumToArrayOfValues } from '../utils/GenericUtils';
import { MuscleFilterEnum } from '../utils/MuscleEnum';
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
  muscleFilterEnum: string[] = enumToArrayOfValues(MuscleFilterEnum);
  muscleMonitorized: MuscleFilterEnum = MuscleFilterEnum.MONITORIZED;

  filterSearchBar: string = '';
  filterMuscles: string[] = [];

  @ViewChild('listWrapper', { static: false }) listWrapper: IonContent;
  @ViewChild('listExercises') exercisesList: IonList;

  constructor(
    private exerciseService: ExerciseService,
    private modalController: ModalController,
    private userService: UserService,
    private alertController: AlertController,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe((res) => (this.loggedUser = res));
    this.exercises$ = this.exerciseService.exercises$;
    this.isLoading$ = this.loaderService.isLoading$;
    this.loaderService.showLoader('Loading exercises...').then(() => {
      this.exerciseService.loadExercises();
      this.exercises$.pipe(take(1)).subscribe(() => {
        this.loaderService.hideLoader();
      });
    });
    this.exerciseService.exercisesAction$.subscribe((a) => {
      switch (a) {
        case CRUDAction.CREATE:
          this.toastService.showToast('Exercise created successfully');
          this.loaderService.hideLoader();
          setTimeout(() => this.listWrapper.scrollToBottom(), 500);
          break;
        case CRUDAction.UPDATE:
          this.toastService.showToast('Exercise updated successfully');
          this.loaderService.hideLoader();
          break;
        case CRUDAction.DELETE:
          this.toastService.showToast('Exercise deleted successfully');
          this.loaderService.hideLoader();
          break;
      }
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
          handler: () => {
            this.exercisesList.closeSlidingItems();
          },
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

    const isUpdate: boolean = !!exercise;
    const modal = await this.modalController.create({
      component: CreateExerciseModalComponent,
      componentProps: {
        exercise,
        isUpdate,
      },
    });
    await modal.present();

    //data is a boolean setted when an action is performed (create or update exercise)
    const { data } = await modal.onDidDismiss<boolean>();
    if (!data) {
      this.exercisesList.closeSlidingItems();
    }
  }

  async marksForExerciseModal(exercise: Exercise) {
    const modal = await this.modalController.create({
      component: MarksExerciseModalComponent,
      componentProps: {
        userId: this.loggedUser._id,
        exercise,
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

  selectChipMuscle($event?: any): void {
    const items: HTMLDivElement[] = Array.from(
      document.querySelector('ion-list').children
    ) as HTMLDivElement[];
    if ($event) {
      const muscleSelected = (
        $event.currentTarget as HTMLElement
      ).id.toLowerCase();

      if (muscleSelected === MuscleFilterEnum.ALL.toLowerCase()) {
        this.filterMuscles.length = 0;
        $event.currentTarget.parentNode.childNodes.forEach(
          (n: IonChip) => (n.color = undefined)
        );
      } else {
        if (!this.filterMuscles.includes(muscleSelected)) {
          this.filterMuscles.push(muscleSelected);
          ($event.currentTarget as IonChip).color = 'secondary';
          ($event.currentTarget as HTMLElement).classList.add(
            'ion-chip-selected'
          );
        } else {
          const index = this.filterMuscles.findIndex(
            (m) => m === muscleSelected
          );
          this.filterMuscles.splice(index, 1);
          ($event.currentTarget as IonChip).color = undefined;
        }
      }
    }

    requestAnimationFrame(() => {
      items.forEach((item) => {
        const muscleOfItem = item.id.split('-')[1].toLowerCase();
        const itemIsMonitorized = item.id.split('-')[2];
        if (this.filterMuscles.length > 0) {
          for (let i = 0; i < this.filterMuscles.length; i++) {
            const muscle = this.filterMuscles[i];
            let shouldShow: boolean;
            if (
              this.filterMuscles.includes(
                MuscleFilterEnum.MONITORIZED.toLowerCase()
              )
            ) {
              if (this.filterMuscles.length > 1) {
                shouldShow =
                  itemIsMonitorized === 'true' &&
                  muscleOfItem.indexOf(muscle) > -1;
              } else {
                shouldShow = itemIsMonitorized === 'true';
              }
            } else {
              shouldShow = muscleOfItem.indexOf(muscle) > -1;
            }

            if (shouldShow) {
              item.style.display = 'block';
              break;
            } else {
              item.style.display = 'none';
            }
          }
        } else {
          item.style.display = 'block';
        }
      });
    });
    setTimeout(() => this.listWrapper.scrollToTop(), 0);
  }

  doRefresh($event: any): void {
    this.exerciseService.loadExercises();
    this.exercises$.pipe(take(1)).subscribe(() => {
      $event.target.complete();
    });
  }
}
