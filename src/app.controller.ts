import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class AppController {
  @Get()
  getHello(): string {
    return 'alive';
  }
}
