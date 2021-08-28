import { Test, TestingModule } from '@nestjs/testing';
import { MarkController } from './mark.controller';

describe('MarkController', () => {
  let controller: MarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkController],
    }).compile();

    controller = module.get<MarkController>(MarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
