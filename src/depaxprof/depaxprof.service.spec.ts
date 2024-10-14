import { Test, TestingModule } from '@nestjs/testing';
import { DepaxprofService } from './depaxprof.service';

describe('DepaxprofService', () => {
  let service: DepaxprofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepaxprofService],
    }).compile();

    service = module.get<DepaxprofService>(DepaxprofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
