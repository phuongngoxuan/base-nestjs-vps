import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 40 });
import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { UserMainService } from '../user-main/user-main.service';
import { UserService } from '../user/user.service';

@Console()
@Injectable()
export class UserMainConsole {
  private logger = new Logger('Main user main');

  constructor(private readonly userMainService: UserMainService, private readonly userMigrateService: UserService) {}

  @Command({
    command: 'migrate-user-main',
    description: 'Migrate user main info',
  })
  async migrateUserMain(): Promise<void> {
    try {
      //user
      await this.createUserMain();
      // client
      await this.createClientMain();
      // source
      await this.createSourceMain();
      // department
      await this.createDepartmentMain();
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  async createUserMain(): Promise<void> {
    const users = await this.userMigrateService.findUserMongo();
    const userInfo = users.map((_) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { old_id, old_counselor_id, old_source_id, old_part_hallo_id, ...dataInfo } = _;

      return dataInfo;
    });

    await this.userMainService.createUser(userInfo);
  }

  async createClientMain(): Promise<void> {
    const client = await this.userMigrateService.findClientMongo();
    const clientInfo = client.map((_) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { old_id, old_counselor_id, old_source_id, old_part_hallo_id, ...dataInfo } = _;
      return dataInfo;
    });

    await this.userMainService.createClient(clientInfo);
  }

  async createSourceMain(): Promise<void> {
    const sources = await this.userMigrateService.findSourceMongo();
    const SourceInfo = sources.map((_) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { old_id, ...source } = _;
      return source;
    });

    await this.userMainService.createSource(SourceInfo);
  }

  async createDepartmentMain(): Promise<void> {
    const department = await this.userMigrateService.findDepartmentMongo();
    const departmentInfo = department.map((_) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { old_id, ...department } = _;
      return department;
    });

    await this.userMainService.createDepartment(departmentInfo);
  }
}
