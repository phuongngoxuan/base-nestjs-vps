import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 40 });
import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { UserService } from '../user/user.service';

@Console()
@Injectable()
export class MigrateUserConsole {
  private logger = new Logger(MigrateUserConsole.name);

  constructor(private readonly usersService: UserService) {}

  @Command({
    command: 'migrate-source-department',
    description: 'Migrate source department info',
  })
  async crawler(): Promise<void> {
    try {
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }
}
