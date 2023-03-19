import { Injectable } from '@nestjs/common';
import { QueryUserHistoryDto } from './dto/query-history-user.dto';
import { ResHistoriesDto } from './dto/response-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoriesRepository } from '../../models/repositories/histories.repository';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoriesRepository, 'report')
    private historiesRepositoryReport: HistoriesRepository,
  ) {}

  async getUserHistory(query: QueryUserHistoryDto): Promise<ResHistoriesDto> {
    const { sort, limit, page } = query;
    const queryBuilder = this.historiesRepositoryReport.createQueryBuilder('histories');
    queryBuilder.where('histories.id IS NOT NULL');
    if (query) {
      if (sort) {
        queryBuilder.addOrderBy('histories.createdAt', sort);
      }
      if (limit) {
        queryBuilder.limit(limit);
      }
      if (page) {
        queryBuilder.offset((page - 1) * limit);
      } else {
        queryBuilder.skip(0);
      }
    }

    const [data, total] = await queryBuilder.getManyAndCount();
    return {
      data,
      metadata: {
        total,
        page: page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
