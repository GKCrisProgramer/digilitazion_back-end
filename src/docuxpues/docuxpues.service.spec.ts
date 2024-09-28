import { Test, TestingModule } from '@nestjs/testing';
import { DocuxpuesService } from './docuxpues.service';

describe('DocuxpuesService', () => {
  let service: DocuxpuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocuxpuesService],
    }).compile();

    service = module.get<DocuxpuesService>(DocuxpuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
