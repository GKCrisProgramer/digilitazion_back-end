import { Test, TestingModule } from '@nestjs/testing';
import { DocuxprofService } from './docuxprof.service';

describe('DocuxprofService', () => {
  let service: DocuxprofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocuxprofService],
    }).compile();

    service = module.get<DocuxprofService>(DocuxprofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
