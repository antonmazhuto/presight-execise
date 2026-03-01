import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Job } from './jobs.types';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  },
})
export class JobsGateway {
  @WebSocketServer()
  server: Server;

  sendJobResult(job: Job) {
    this.server.emit('job_result', {
      id: job.id,
      status: job.status,
      result: job.result,
    });
  }
}
