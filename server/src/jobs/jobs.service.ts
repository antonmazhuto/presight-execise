import { Injectable, OnModuleInit } from '@nestjs/common';
import { Job } from './jobs.types';
import { faker } from '@faker-js/faker';
import { JobsGateway } from './jobs.gateway';

@Injectable()
export class JobsService implements OnModuleInit {
  private queue: Job[] = [];

  constructor(private readonly jobsGateway: JobsGateway) {}

  onModuleInit() {
    setInterval(() => {
      void this.processNext();
    }, 2000);
  }

  createJob(): Job {
    const job: Job = {
      id: faker.string.uuid(),
      createdAt: new Date(),
      status: 'pending',
    };
    this.queue.push(job);
    return job;
  }

  private async processNext() {
    const job = this.queue.shift();
    if (!job) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    job.status = 'completed';
    job.result = `Result for job ${job.id.slice(0, 8)}`;

    this.jobsGateway.sendJobResult(job);
  }
}
