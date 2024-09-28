import { Test, TestingModule } from '@nestjs/testing';
import { DocuxpuesController } from './docuxpues.controller';

describe('DocuxpuesController', () => {
  let controller: DocuxpuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocuxpuesController],
    }).compile();

    controller = module.get<DocuxpuesController>(DocuxpuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
