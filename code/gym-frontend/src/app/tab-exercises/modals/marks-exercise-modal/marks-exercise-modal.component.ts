import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Mark } from 'src/app/models/mark.model';

@Component({
  selector: 'app-marks-exercise-modal',
  templateUrl: './marks-exercise-modal.component.html',
  styleUrls: ['./marks-exercise-modal.component.scss'],
})
export class MarksExerciseModalComponent implements OnInit {
  marks: Observable<Mark[]>;
  mark: Mark = {};

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  formSubmit(): void {}

  dismiss(): void {
    this.modalController.dismiss();
  }
}
