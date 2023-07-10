import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@EntityRepository(UsersEntity)
export class UserRepositorySql extends Repository<UsersEntity> {
  async findUserSql(): Promise<any> {
    const user = await this.createQueryBuilder('users').select('*').execute();
    console.log(user);
    return user;
  }
}
