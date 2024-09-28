import { Test, TestingModule } from '@nestjs/testing';
import { DepaxpuesController } from './depaxpues.controller';

describe('DepaxpuesController', () => {
  let controller: DepaxpuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepaxpuesController],
    }).compile();

    controller = module.get<DepaxpuesController>(DepaxpuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
