import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { faker } from '@faker-js/faker';
import { AMOUNT_OF_USERS, HOBBIES } from '../constants';
import { FindAllDto } from './dto/find-all.dto';
import { UsersResponse } from './users.types';

@Injectable()
export class UsersService {
  private readonly users: User[];

  public constructor() {
    const fakeUsers: User[] = [];
    for (let i = 0; i < AMOUNT_OF_USERS; i++) {
      const user = this.createRandomUser();
      fakeUsers.push(user);
    }
    this.users = fakeUsers;
  }

  public findAll({
    page,
    limit,
    search,
    nationality,
    hobby,
  }: FindAllDto): UsersResponse {
    let result = this.users;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.first_name.toLowerCase().includes(q) ||
          u.last_name.toLowerCase().includes(q),
      );
    }

    if (nationality) {
      result = result.filter((u) => u.nationality === nationality);
    }

    if (hobby) {
      result = result.filter((u) => u.hobbies.includes(hobby));
    }
    const total = result.length;

    const safePage = page ?? 1;
    const safeLimit = limit ?? 20;
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;
    const items = result.slice(start, end);
    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
    };
  }

  public getUsersStats() {
    const nationalityMap = new Map<string, number>();
    const hobbyMap = new Map<string, number>();

    for (const user of this.users) {
      nationalityMap.set(
        user.nationality,
        (nationalityMap.get(user.nationality) ?? 0) + 1,
      );

      for (const hobby of user.hobbies) {
        hobbyMap.set(hobby, (hobbyMap.get(hobby) ?? 0) + 1);
      }
    }

    const nationalityStats = Array.from(nationalityMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([nationality, count]) => ({ nationality, count }));

    const hobbyStats = Array.from(hobbyMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([hobby, count]) => ({ hobby, count }));

    const nationalities = Array.from(nationalityMap.keys()).sort();
    const hobbies = Array.from(hobbyMap.keys()).sort();

    return {
      nationalities,
      hobbies,
      nationalityStats,
      hobbyStats,
    };
  }

  private createRandomUser(): User {
    const length = Math.floor(Math.random() * 11);
    const shuffled = [...HOBBIES].sort(() => Math.random() - 0.5);
    const hobbies = shuffled.slice(0, length);
    return new User({
      id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: Math.floor(Math.random() * (70 - 16 + 1)) + 16,
      nationality: faker.location.country(),
      hobbies,
    });
  }
}
