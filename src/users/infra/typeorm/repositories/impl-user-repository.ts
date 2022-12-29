import {
  UserFindParameters,
  UserRepository,
} from '../../../domain/contracts/repositories/user-repository';
import { UserEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { User, PartialUser } from '../../../domain/entities';

@Injectable()
export class ImplUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(parameters: UserFindParameters): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: parameters,
    });
    if (!userEntity) return;
    return UserMapper.toDomain(userEntity);
  }

  async create(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const createdUser = await this.userRepository.save(userEntity);
    return UserMapper.toDomain(createdUser);
  }

  async update(currentUser: User, partialUser: PartialUser): Promise<User> {
    const userEntity = UserMapper.toEntity(currentUser);
    this.userRepository.merge(userEntity, partialUser);
    const updatedUser = await this.userRepository.save(userEntity);
    return UserMapper.toDomain(updatedUser);
  }
}
