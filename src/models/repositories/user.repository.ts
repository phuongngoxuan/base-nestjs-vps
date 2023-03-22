import { UserEntity } from 'src/models/entities/users.entity';
import { GetUsersDto } from 'src/modules/user/dto/get-users.dto';
import { GetUserListRes } from 'src/shares/interface/paging-response.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUserByAccountId(accountId: number): Promise<UserEntity> {
    const user = await this.createQueryBuilder('users')
      .select('*')
      .innerJoin('accounts', 'accounts', 'accounts.ownerId = users.id')
      .where('accounts.id = :accountId', { accountId })
      .execute();
    if (user[0]) {
      return user[0];
    } else return null;
  }

  async getUsers(getUser: GetUsersDto): Promise<GetUserListRes> {
    const { sort, page, limit } = getUser;
    const qb = this.createQueryBuilder('users');
    const skip = (page - 1) * limit;
    const [users, count] = await qb.skip(skip).take(limit).orderBy('users.createdAt', sort).getManyAndCount();

    return {
      items: users,
      meta: {
        currentPage: page,
        itemCount: users.length,
        itemsPerPage: limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
