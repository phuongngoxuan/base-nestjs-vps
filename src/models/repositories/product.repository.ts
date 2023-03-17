import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.enntity';
import { GetUsersDto } from '../../modules/user/dto/get-users.dto';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async getProducts(productDto: GetUsersDto): Promise<any> {
    const { sort, page, limit } = productDto;
    const qb = this.createQueryBuilder('products');
    const skip = (page - 1) * limit;
    const [product, count] = await qb.skip(skip).take(limit).orderBy('products.createdAt', sort).getManyAndCount();

    return {
      items: product,
      meta: {
        currentPage: page,
        itemCount: product.length,
        itemsPerPage: limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
