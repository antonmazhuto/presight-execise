import { Controller, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  createJob() {
    const job = this.jobsService.createJob();
    return { id: job.id, status: job.status };
  }
}
