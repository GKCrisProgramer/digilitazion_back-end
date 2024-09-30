import { Test, TestingModule } from '@nestjs/testing';
import { DepaxdocuService } from './depaxdocu.service';

describe('DepaxdocuService', () => {
  let service: DepaxdocuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepaxdocuService],
    }).compile();

    service = module.get<DepaxdocuService>(DepaxdocuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
