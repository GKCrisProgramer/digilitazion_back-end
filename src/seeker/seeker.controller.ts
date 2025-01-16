import { Controller, Get, Query } from '@nestjs/common';
import { SeekerService } from './seeker.service';

@Controller('seeker')
export class SeekerController {
    constructor(private readonly SeekerServiceService: SeekerService) {}

    @Get()
    async searchProfilesCoursesAndDepartmentsWithDocuments(@Query('q') query: string) {
      return this.SeekerServiceService.searchProfilesCoursesAndDepartmentsWithDocuments(query);
    }
  
}
