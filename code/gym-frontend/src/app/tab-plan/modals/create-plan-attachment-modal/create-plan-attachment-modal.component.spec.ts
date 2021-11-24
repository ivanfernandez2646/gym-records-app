import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePlanAttachmentModalComponent } from './create-plan-attachment-modal.component';

describe('CreatePlanAttachmentModalComponent', () => {
  let component: CreatePlanAttachmentModalComponent;
  let fixture: ComponentFixture<CreatePlanAttachmentModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlanAttachmentModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePlanAttachmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
