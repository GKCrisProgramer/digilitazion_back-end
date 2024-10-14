import { Test, TestingModule } from '@nestjs/testing';
import { DepaxprofController } from './depaxprof.controller';

describe('DepaxprofController', () => {
  let controller: DepaxprofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepaxprofController],
    }).compile();

    controller = module.get<DepaxprofController>(DepaxprofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
