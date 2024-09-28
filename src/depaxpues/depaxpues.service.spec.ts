import { Test, TestingModule } from '@nestjs/testing';
import { DepaxpuesService } from './depaxpues.service';

describe('DepaxpuesService', () => {
  let service: DepaxpuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepaxpuesService],
    }).compile();

    service = module.get<DepaxpuesService>(DepaxpuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
