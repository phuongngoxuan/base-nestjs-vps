import { Controller, Query, Get } from '@nestjs/common';
import { QueryUserHistoryDto } from './dto/query-history-user.dto';
import { ResHistoriesDto } from './dto/response-history.dto';
import { HistoryService } from './history.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller('history')
@ApiTags('history')
export class HistoryController {
  constructor(private userHistoryService: HistoryService) {}

  @ApiOkResponse({
    type: ResHistoriesDto,
    isArray: true,
  })
  @Get()
  async getUserHistory(@Query() query: QueryUserHistoryDto): Promise<ResHistoriesDto> {
    return await this.userHistoryService.getUserHistory(query);
  }
}
