import { Test, TestingModule } from '@nestjs/testing';
import { DepaxdocuController } from './depaxdocu.controller';

describe('DepaxdocuController', () => {
  let controller: DepaxdocuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepaxdocuController],
    }).compile();

    controller = module.get<DepaxdocuController>(DepaxdocuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
