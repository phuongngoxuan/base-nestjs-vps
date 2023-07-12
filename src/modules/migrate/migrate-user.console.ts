import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 40 });
import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { UserService } from '../user/user.service';
import { UsersEntity } from 'src/models/entities/users.entity';
import { Client, ClientRole, ClientStatus } from '../user/schemas/client.schema';
import { User, UserRole, UserStatus } from '../user/schemas/user.schema';
import { Source } from '../user/schemas/source.schema';
import { Department } from '../user/schemas/department.schema';

@Console()
@Injectable()
export class MigrateUserConsole {
  private logger = new Logger(MigrateUserConsole.name);
  userRoleInfo = [1, 2, 3, 5, 6, 7, 8, 9, 10];
  clientRoleInfo = [4];

  constructor(private readonly usersService: UserService) {}

  @Command({
    command: 'migrate-user',
    description: 'Migrate User Info',
  })
  async crawler(): Promise<void> {
    this.logger.log('MigrateUser');

    await Promise.all([
      // migrate source
      this.migrateSource(),
      // migrate department
      this.migrateDepartment(),
      // migrate user
      this.migrateUser(),
    ]);

    await Promise.all([
      // update user *** counselor, source, part hallo update and change name department ***
      this.updateUserInfo(),
      // update client
      this.updateClientInfo(),
    ]);

    try {
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  async updateUserInfo(): Promise<void> {
    const users = await this.usersService.getUserMongo();

    await Promise.all(
      users.map(async (user) => {
        const { old_counselor_id, old_source_id, old_part_hallo_id } = user;

        const [counselor, source, department]: [any, any, any] = await Promise.all([
          this.usersService.findOneUserMongo({ old_id: old_counselor_id }),
          this.usersService.findSourceMongo({ old_id: old_source_id }),
          this.usersService.findDepartmentMongo({ old_id: old_part_hallo_id }),
        ]);

        // if (counselor || source[0]?.id || department[0]?.id) {
        //   console.log('_____________User______________');
        //   console.log(user['id']);
        //   console.log(counselor?.id);
        //   console.log(source[0]?.id);
        //   console.log(department[0]?.id);
        // }

        await this.usersService.findUserByIdAndUpdateMongo(user['id'], {
          counselor_id: counselor?.id,
          source_id: source[0]?.id,
          department_id: department[0]?.id,
        });
      }),
    );
  }

  async updateClientInfo(): Promise<void> {
    const clients = await this.usersService.getClientMongo();

    await Promise.all(
      clients.map(async (client) => {
        const { old_counselor_id, old_source_id, old_part_hallo_id } = client;

        const [counselor, source, department]: [any, any, any] = await Promise.all([
          this.usersService.findOneUserMongo({ old_id: old_counselor_id }),
          this.usersService.findSourceMongo({ old_id: old_source_id }),
          this.usersService.findDepartmentMongo({ old_id: old_part_hallo_id }),
        ]);

        // if (counselor?.id || source[0]?.id || department[0]?.id) {
        //   console.log('_____________client______________');
        //   console.log(client['id']);
        //   console.log(counselor?.id);
        //   console.log(source[0]?.id);
        //   console.log(department[0]?.id);
        // }

        await this.usersService.findClientByIdAndUpdateMongo(client['id'], {
          counselor_id: counselor?.id,
          source_id: source?.id,
          department_id: department?.id,
        });
      }),
    );
  }

  async migrateSource(): Promise<void> {
    const sourceSql = await this.usersService.findSourceSql({});

    const sourceInfo = sourceSql.map((source) => {
      const { id, Name, Language, CreatedBy, UpdatedBy } = source;
      const newSource = new Source();

      newSource.old_id = id;
      newSource.name = Name;
      newSource.language = Language;
      newSource.created_by = CreatedBy;
      newSource.updated_by = UpdatedBy;
      return newSource;
    });

    await this.usersService.createSourceMongo(sourceInfo);
  }

  async migrateDepartment(): Promise<void> {
    const departments = await this.usersService.findDepartmentSql({});

    const departmentInfo = departments.map((department) => {
      const { id, CreatedBy, UpdatedBy, PartName } = department;
      const newDepartment = new Department();

      newDepartment.old_id = id;
      newDepartment.name = PartName;
      newDepartment.created_by = CreatedBy;
      newDepartment.updated_by = UpdatedBy;
      return newDepartment;
    });

    await this.usersService.createDepartment(departmentInfo);
  }

  async migrateUser(): Promise<void> {
    const [users, clients] = await Promise.all([await this.getUserDataFromSql(), await this.getClientDataFromSql()]);
    const usersInfo = await this.formatUserData(users);
    const clientInfo = await this.formatClientData(clients);

    await Promise.all([this.usersService.createUserMongo(usersInfo), this.usersService.createClientMongo(clientInfo)]);
  }

  private async getUserDataFromSql(): Promise<UsersEntity[]> {
    return this.usersService.getUsersSql();
  }

  private async getClientDataFromSql(): Promise<UsersEntity[]> {
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
      newUser.token_deadline = user?.TokenDeadline;

      // newClient.part_hallo_id = client.PartHalloID; // todo convert
      newUser.old_part_hallo_id = user?.PartHalloID; // todo convert

      usersInfo.push(newUser);
    });

    return usersInfo;
  }
}
