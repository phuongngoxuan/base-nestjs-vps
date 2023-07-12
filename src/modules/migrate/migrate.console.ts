import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 40 });
import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { UserService } from '../user/user.service';
import { UsersEntity } from 'src/models/entities/users.entity';
import { Client, ClientRole, ClientStatus } from '../user/schemas/client.schema';
import { User, UserRole, UserStatus } from '../user/schemas/user.schema';

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
      const [users, clients] = await Promise.all([await this.getUserDataFromSql(), await this.getClientDataFromSql()]);

      // user
      const usersInfo = await this.formatUserData(users);

      // client
      const clientInfo = await this.formatClientData(clients);

      await this.usersService.createUserMongo(usersInfo);
      await this.usersService.createClientMongo(clientInfo);
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  private async getUserDataFromSql(): Promise<any[]> {
    return await this.usersService.getUsersSql();
  }

  private async getClientDataFromSql(): Promise<any[]> {
    return this.usersService.getClientsSql();
  }

  private splitStringToArray(str: string): number[] {
    return str.split(',').map((_) => Number(_.trim()));
  }

  checkArrayElementsInArray(sourceArray: number[], targetArray: number[]): boolean {
    return sourceArray.every((element) => targetArray.includes(element));
  }

  async formatClientData(clients: UsersEntity[]): Promise<Client[]> {
    const clientsInfo: Client[] = [];
    const roleClient = Object.keys(ClientRole).map((key) => ClientRole[key]);
    clients.forEach((client) => {
      const newClient = new Client();

      const roleClientOld = this.splitStringToArray(client.RoleID);

      const isValid = this.checkArrayElementsInArray(roleClientOld, roleClient);
      if (!isValid) {
        throw new Error('role invalid');
      }

      newClient.old_id = client.id; // todo convert

      newClient.name = client?.UserName;
      newClient.code = client?.CustomerCode;
      newClient.password = client?.Password;
      newClient.address = [client?.Address];
      newClient.full_name = client?.FullName;
      newClient.japanese_name = client?.JapaneseName;
      newClient.phone = client?.Phone;
      newClient.email = client?.Email;
      newClient.birthday = client?.Birthday;
      newClient.gender = client?.GenderID;
      newClient.role = this.splitStringToArray(client?.RoleID); // todo convert
      newClient.status = client?.Status === 2 ? ClientStatus.ACTIVE : ClientStatus.DE_ACTIVE;
      newClient.pancake = client?.Pancake;
      newClient.full_name_extra = client?.FullNameExtra;
      newClient.pancake_extra = client?.PancakeExtra;

      // newClient.counselor_id = client.CounselorID; // todo convert
      newClient.old_counselor_id = client?.CounselorID; // todo convert

      // newClient.source_id = client.SourceID; // todo convert
      newClient.old_source_id = client?.SourceID; // todo convert

      newClient.zip_code = client?.ZIPCode;
      newClient.image_url = client?.Avatar;
      newClient.created_by = client?.CreatedBy;
      newClient.update_by = client?.UpdatedBy;
      newClient.token_app = client?.TokenApp;
      newClient.token_deadline = client?.TokenDeadline;
      newClient.part_hallo_id = client?.PartHalloID;
      newClient.token_deadline = client?.TokenDeadline;

      // newClient.part_hallo_id = client.PartHalloID; // todo convert
      newClient.old_part_hallo_id = client?.PartHalloID; // todo convert

      clientsInfo.push(newClient);
    });

    return clientsInfo;
  }

  private async formatUserData(users: UsersEntity[]): Promise<User[]> {
    const usersInfo: User[] = [];
    const roleUser = Object.keys(UserRole).map((key) => UserRole[key]);
    users.forEach((user) => {
      const newUser = new User();

      const roleUserOld = this.splitStringToArray(user.RoleID);

      const isValid = this.checkArrayElementsInArray(roleUserOld, roleUser);
      if (!isValid) {
        throw new Error('role invalid');
      }

      newUser.old_id = user?.id; // todo convert

      newUser.name = user?.UserName;
      newUser.code = user?.CustomerCode;
      newUser.password = user?.Password;
      newUser.address = [user?.Address];
      newUser.full_name = user?.FullName;
      newUser.japanese_name = user?.JapaneseName;
      newUser.phone = user?.Phone;
      newUser.email = user?.Email;
      newUser.birthday = user?.Birthday;
      newUser.gender = user?.GenderID;
      newUser.role = this.splitStringToArray(user?.RoleID); // todo convert
      newUser.status = user?.Status === 2 ? UserStatus.ACTIVE : UserStatus.DE_ACTIVE;
      newUser.pancake = user?.Pancake;
      newUser.full_name_extra = user?.FullNameExtra;
      newUser.pancake_extra = user?.PancakeExtra;

      // newClient.counselor_id = client.CounselorID; // todo convert
      newUser.old_counselor_id = user?.CounselorID; // todo convert

      // newClient.source_id = client.SourceID; // todo convert
      newUser.old_source_id = user?.SourceID; // todo convert

      newUser.zip_code = user?.ZIPCode;
      newUser.image_url = user?.Avatar;
      newUser.created_by = user?.CreatedBy;
      newUser.update_by = user?.UpdatedBy;
      newUser.token_app = user?.TokenApp;
      newUser.token_deadline = user?.TokenDeadline;
      newUser.part_hallo_id = user?.PartHalloID;
      newUser.token_deadline = user?.TokenDeadline;

      // newClient.part_hallo_id = client.PartHalloID; // todo convert
      newUser.old_part_hallo_id = user?.PartHalloID; // todo convert

      usersInfo.push(newUser);
    });

    return usersInfo;
  }
}
