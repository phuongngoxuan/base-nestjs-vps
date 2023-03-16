import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../models/repositories/users.repository';
import { listUserInfos } from './data/user-info.seeder';

@Console()
@Injectable()
export class UserSeederConsole {
  constructor(
    @InjectRepository(UserRepository, 'report') private userRepositoryReport: UserRepository,
    @InjectRepository(UserRepository, 'master') private userRepositoryMaster: UserRepository,
  ) {}
  @Command({
    command: 'seeder-user',
    description: 'seeder user',
  })
  async start(): Promise<void> {
    try {
      for (let i = 0; i < listUserInfos.length; i++) {
        const { email, address, role, status } = listUserInfos[i];

        const user = await this.userRepositoryReport.findOne({ address });

        if (!user) {
          await this.userRepositoryMaster.save({ email, address, role, status });
        } else {
          await this.userRepositoryMaster.update({ address }, { email, address, role, status });
        }
      }
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
