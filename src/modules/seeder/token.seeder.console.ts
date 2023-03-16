import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { listTokenInfos } from './data/token-info.seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRepository } from '../../models/repositories/tokens.repository';

@Console()
@Injectable()
export class TokenSeederConsole {
  constructor(
    @InjectRepository(TokenRepository, 'report') private tokenRepositoryReport: TokenRepository,
    @InjectRepository(TokenRepository, 'master') private tokenRepositoryMaster: TokenRepository,
  ) {}
  @Command({
    command: 'seeder-token',
    description: 'seeder token',
  })
  async start(): Promise<void> {
    try {
      for (let i = 0; i < listTokenInfos.length; i++) {
        const { chain, symbol, name } = listTokenInfos[i];

        const token = await this.tokenRepositoryReport.findOne({ symbol });

        if (!token) {
          await this.tokenRepositoryMaster.save({ chain, tokenName: name, symbol });
        } else {
          await this.tokenRepositoryMaster.update({ symbol }, { chain, symbol, tokenName: name });
        }
      }
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
