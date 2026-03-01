import { User } from './user.model';

export interface UsersResponse {
  items: User[];
  total: number;
  page: number;
  limit: number;
}
