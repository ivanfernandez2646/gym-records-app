import { Test, TestingModule } from '@nestjs/testing';
import { PlanAttachmentController } from './plan-attachment.controller';

describe('PlanAttachmentController', () => {
  let controller: PlanAttachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanAttachmentController],
    }).compile();

    controller = module.get<PlanAttachmentController>(PlanAttachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
