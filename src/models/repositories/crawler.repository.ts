import { EntityRepository, Repository } from 'typeorm';
import { CrawlEntity } from '../entities/crawler-status.entity';
@EntityRepository(CrawlEntity)
export class CrawlStatusRepository extends Repository<CrawlEntity> {
  public async findContractName(contractName: string): Promise<CrawlEntity> {
    return await this.createQueryBuilder('crawl_status')
      .select('*')
      .where('crawl_status.contract_name = :contractName', { contractName })
      .execute();
  }

  async findContract(contractName: string): Promise<CrawlEntity> {
    return this.findOne({
      where: {
        contractName: contractName,
      },
    });
  }
}
