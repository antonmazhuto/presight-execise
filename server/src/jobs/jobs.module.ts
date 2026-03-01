import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsGateway } from './jobs.gateway';

@Module({
  providers: [JobsService, JobsGateway],
  controllers: [JobsController],
})
export class JobsModule {}
