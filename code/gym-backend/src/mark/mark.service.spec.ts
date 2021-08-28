import { Test, TestingModule } from '@nestjs/testing';
import { MarkService } from './mark.service';

describe('MarkService', () => {
  let service: MarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkService],
    }).compile();

    service = module.get<MarkService>(MarkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
