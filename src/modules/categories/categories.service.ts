import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { UpdateCategoriesDto } from './dto/update.categories.dto';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { httpErrors } from 'src/shares/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) private categoriesModel: Model<CategoriesDocument>) {}

  async findCategory(getCategoriesDto: GetCategoriesDto): Promise<Categories[]> {
    const { sort, page, limit } = getCategoriesDto;
    return this.categoriesModel
      .find({ parent_id: { $exists: false } })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: sort })
      .lean();
  }

  async createCategory(createCategoriesDto: CreateCategoriesDto): Promise<void> {
    const { name } = createCategoriesDto;
    const category = await this.categoriesModel.findOne({ name });
    if (category) {
      throw new BadRequestException(httpErrors.CATEGORY_EXISTED);
    }
    await this.categoriesModel.create(createCategoriesDto);
  }

  async updateCategory(updateCategoriesDto: UpdateCategoriesDto): Promise<void> {
    const { id } = updateCategoriesDto;
    const category = await this.categoriesModel.findById(id);
    if(!category){
        throw new BadRequestException(httpErrors.CATEGORY_NOT_FOUND);
    }
    await this.categoriesModel.updateOne({ _id: updateCategoriesDto.id }, updateCategoriesDto);
  }

  async findCategoryById(id: string): Promise<Categories> {
    return this.categoriesModel.findById(id);
  }

  async deleteCategory(id:string):Promise<void>{
    await this.categoriesModel.deleteOne({_id:id});
  }
}
