import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MarksExerciseModalComponent } from './marks-exercise-modal.component';

describe('MarksExerciseModalComponent', () => {
  let component: MarksExerciseModalComponent;
  let fixture: ComponentFixture<MarksExerciseModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MarksExerciseModalComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(MarksExerciseModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
