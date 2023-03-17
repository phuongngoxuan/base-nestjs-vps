import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/shares/exceptions';
import { UsersEntity } from 'src/models/entities/users.entity';
import { UserRole, UserStatus } from 'src/shares/enums/user.enum';
import { checkRecoverSameAddress } from 'src/shares/helpers/utils';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Transaction, TransactionRepository } from 'typeorm';

import { UserRepository } from 'src/models/repositories/users.repository';

import { TransactionCrawlDto } from '../crawler/dto/transaction-crawl.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserListRes } from 'src/shares/interface/paging-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository, 'master') private usersRepositoryMaster: UserRepository,
    @InjectRepository(UserRepository, 'report') private usersRepositoryReport: UserRepository,
  ) {}

  async checkUserIdExisted(id: number): Promise<boolean> {
    const user = await this.usersRepositoryReport.findOne({
      id: id,
    });
    if (user) return true;
    else return false;
  }

  async checkUserAddressExisted(address: string): Promise<boolean> {
    const user = await this.usersRepositoryReport.findOne({
      where: {
        address: address,
      },
      select: ['id'],
    });
    return !!user;
  }

  async findUserById(id: number): Promise<UsersEntity> {
    const user = await this.usersRepositoryReport.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException(httpErrors.ACCOUNT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async findUserByAddress(address: string): Promise<UsersEntity> {
    const user = await this.usersRepositoryReport.findOne({
      where: {
        address: address,
      },
    });
    if (!user) {
      throw new HttpException(httpErrors.ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findAll(getUser: GetUsersDto): Promise<GetUserListRes> {
    return this.usersRepositoryReport.getUsers(getUser);
  }

  async findOne(id: number): Promise<UsersEntity> {
    const user = await this.usersRepositoryReport.findOne({ id });

    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const userData = await this.usersRepositoryReport.findOne({ email: createUserDto.email });
    if (userData) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    return await this.usersRepositoryMaster.save(createUserDto);
  }

  async update(id: number, user: UpdateUserDto): Promise<void> {
    await this.usersRepositoryMaster.update(id, { ...user });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepositoryMaster.delete(id);
  }

  @Transaction({ connectionName: 'master' })
  async createUser(
    createUserDto: CreateUserDto,
    @TransactionRepository(UsersEntity) transactionRepositoryUser?: Repository<UsersEntity>,
  ): Promise<UsersEntity> {
    const { message, address, signature } = createUserDto;

    const sameAddress = await checkRecoverSameAddress({ address, signature, message });
    if (!sameAddress) {
      throw new HttpException(httpErrors.ACCOUNT_HASH_NOT_MATCH, HttpStatus.BAD_REQUEST);
    }

    const newUser = await transactionRepositoryUser.save({
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      address: createUserDto.address,
    });

    return newUser;
  }

  async getUserByAddressViaTransaction(address: string, transaction: TransactionCrawlDto): Promise<UsersEntity> {
    return await transaction.transactionRepositoryUser.findOne({
      address,
    });
  }

  async getUserPoolViaTransaction(id: number, transaction: TransactionCrawlDto): Promise<any> {
    return transaction.transactionRepositoryUser
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.userPool', 'userPools')
      .where('users.id = :id', { id })
      .getOne();
  }
}
