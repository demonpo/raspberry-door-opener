import { User } from '../../entities/user.entitiy';
import { PartialUser } from '../../entities/partial-user.entity';

export type UserFindParameters = { email: string } | { id: string };
export interface UserRepository {
  create(user: User): Promise<User>;
  update(currentUser: User, partialUser: PartialUser): Promise<User>;
  findOne(parameters: UserFindParameters): Promise<User>;
}

export const UserRepository = Symbol('UserRepository');
