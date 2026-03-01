export type JobStatus = 'pending' | 'completed';

export interface Job {
  id: string;
  createdAt: Date;
  status: JobStatus;
  result?: string;
}
