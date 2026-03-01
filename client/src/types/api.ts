export type User = {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string[];
};

export type UsersResponse = {
  items: User[];
  total: number;
  page: number;
  limit: number;
};

export type UsersQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  nationality?: string;
  hobby?: string;
};

export type UsersStatsResponse = {
  nationalities: string[];
  hobbies: string[];
  hobbyStats: { hobby: string; count: number }[];
  nationalityStats: { nationality: string; count: number }[];
};
