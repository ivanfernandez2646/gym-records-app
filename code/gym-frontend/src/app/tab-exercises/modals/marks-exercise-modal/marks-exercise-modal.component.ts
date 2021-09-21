import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { Mark } from 'src/app/models/mark.model';
import { MarkService } from 'src/app/services/mark.service';

@Component({
  selector: 'app-marks-exercise-modal',
  templateUrl: './marks-exercise-modal.component.html',
  styleUrls: ['./marks-exercise-modal.component.scss'],
})
export class MarksExerciseModalComponent implements OnInit {
  userId: string;
  exercise: Exercise;

  marks$: Observable<Mark[]>;
  mark: Mark = {};

  constructor(
    private modalController: ModalController,
    private markService: MarkService
  ) {}

  ngOnInit() {
    this.mark.user = this.userId;
    this.mark.exercise = this.exercise._id;
    this.marks$ = this.markService.getMarksObservableFiltered(
      this.exercise._id
    );
    this.markService.loadMarks(this.userId, this.exercise._id);
  }

  formSubmit(): void {
    this.markService.create(this.mark);
  }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
