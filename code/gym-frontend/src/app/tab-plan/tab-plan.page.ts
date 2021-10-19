import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { ExerciseService } from '../services/exercise.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-tab-plan',
  templateUrl: './tab-plan.page.html',
  styleUrls: ['./tab-plan.page.scss'],
})
export class TabPlanPage implements OnInit {
  // TODO: Remove exercises observable. It's only for test component visualisation until
  // plan attachment service has been developed
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  currDate: Date;
  minDate: Date;
  maxDate: Date;

  constructor(
    private exerciseService: ExerciseService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.currDate = new Date(Date.now());
    this.minDate = new Date(
      this.currDate.getFullYear() - 5,
      this.currDate.getMonth()
    );
    this.maxDate = new Date(
      this.currDate.getFullYear() + 5,
      this.currDate.getMonth()
    );

    this.exercises$ = this.exerciseService.exercises$;
    this.isLoading$ = this.loaderService.isLoading$;
  }
}
