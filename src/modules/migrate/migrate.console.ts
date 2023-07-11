import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 40 });
import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { UserService } from '../user/user.service';

@Console()
@Injectable()
export class MigrateUserConsole {
  private logger = new Logger(MigrateUserConsole.name);
  userRoleInfo = [2, 3, 4, 5];
  clientRoleInfo = [1];

  constructor(private readonly usersService: UserService) {}

  @Command({
    command: 'migrate-user',
    description: 'Migrate User Info',
  })
  async crawler(): Promise<void> {
    this.logger.log('MigrateUser');
    try {
      const users = await this.fetchUserDataFromSql();
      const usersInfo = [];
      const clientInfo = [];

      users.map((user) => {
        const userRoles = this.splitStringToArray(user.role);
        // user
        const isUser = this.checkArrayElementsInArray(userRoles, this.userRoleInfo);
        if (isUser) {
          const userInfo = this.formatUserData(users);
          clientInfo.push(userInfo);
        }

        // client
        const isClient = this.checkArrayElementsInArray(userRoles, this.clientRoleInfo);
        if (isClient) {
          const clientInfo = this.formatClientData(users);
          usersInfo.push(clientInfo);
        }
      });

      console.log(usersInfo);
      console.log(clientInfo);

      await this.usersService.createUserMongo(usersInfo);
      await this.usersService.createClientMongo(clientInfo);
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  private async fetchUserDataFromSql(): Promise<any[]> {
    return await this.usersService.getUserSql();
  }

  private splitStringToArray(str: string): number[] {
    return str.split(',').map((_) => Number(_.trim()));
  }

  private checkArrayElementsInArray(sourceArray: number[], targetArray: number[]): boolean {
    return sourceArray.every((element) => targetArray.includes(element));
  }

  formatClientData(clients: any[]): any {
    return clients.map((client) => ({
      name: client.name,
      code: 'xxx',
      Japanese_name: 'xxx',
      address: 'xxx',
      email: 'xxx',
      phone_number: 'xxx',
      password: 'xxx',
      is_verify: 'xxx',
      is_banned: 'xxx',
      image_url: 'xxx',
      client_products: 'xxx',
      client_policy_id: 'xxx',
      exp_point: 'xxx',
      token_points: 'xxx',
      reward_points: 'xxx',
      status: 'xxx',
      role: 'xxx',
      facebook_id: 'xxx',
      google_id: 'xxx',
      last_login_at: 'xxx',
    }));
  }

  private formatUserData(users: any[]): any {
    return users.map((user) => ({
      name: user.name,
      code: 'xxx',
      Japanese_name: 'xxx',
      address: 'xxx',
      email: 'xxx',
      phone_number: 'xxx',
      password: 'xxx',
      role: 'xxx',
      status: 'xxx',
      posts: 'xxx',
      is_banned: 'xxx',
      image_url: 'xxx',
      lastLoginAt: 'xxx',
    }));
  }
}
