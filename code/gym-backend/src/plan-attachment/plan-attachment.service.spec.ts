import { Test, TestingModule } from '@nestjs/testing';
import { PlanAttachmentService } from './plan-attachment.service';

describe('PlanAttachmentService', () => {
  let service: PlanAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanAttachmentService],
    }).compile();

    service = module.get<PlanAttachmentService>(PlanAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
