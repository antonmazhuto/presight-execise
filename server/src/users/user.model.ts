export class User {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string[];

  constructor(init: Omit<User, 'fullName'>) {
    Object.assign(this, init);
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
