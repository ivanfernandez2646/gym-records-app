import { TestBed } from '@angular/core/testing';

import { PlanAttachmentService } from './plan-attachment.service';

describe('PlanAttachmentService', () => {
  let service: PlanAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
