import { Test, TestingModule } from '@nestjs/testing';
import { DocuxprofController } from './docuxprof.controller';

describe('DocuxprofController', () => {
  let controller: DocuxprofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocuxprofController],
    }).compile();

    controller = module.get<DocuxprofController>(DocuxprofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
