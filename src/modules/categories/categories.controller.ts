import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update.categories.dto';
import { Auth } from 'src/shares/decorators/http.decorators';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { CategoriesService } from './categories.service';
import { Categories } from './schemas/categories.schema';
import { UserRole } from 'src/shares/enums/user.enum';
import { DeleteCategoriesDto } from './dto/delete-categories.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get categories' })
  async getCategory(@Param() getCategoriesDto: GetCategoriesDto): Promise<Categories[]> {
    return await this.categoriesService.findCategory(getCategoriesDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get categories by id' })
  async findOneCategory(@Param('id') id: string): Promise<Categories> {
    return await this.categoriesService.findCategoryById(id);
  }

  @Post()
  @Auth([UserRole.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin create categories' })
  async createCategory(@Body() createCategoriesDto: CreateCategoriesDto): Promise<void> {
    await this.categoriesService.createCategory(createCategoriesDto);
  }

  @Put()
  @Auth([UserRole.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin update categories by id' })
  async updateCategory(@Body() updateCategoriesDto: UpdateCategoriesDto): Promise<void> {
    await this.categoriesService.updateCategory(updateCategoriesDto);
  }

  @Delete()
  @Auth([UserRole.ADMIN])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin delete categories by id' })
  async deleteCategory(@Body() deleteCategoriesDto: DeleteCategoriesDto): Promise<void> {
    await this.categoriesService.deleteCategory(deleteCategoriesDto.id );
  }
}