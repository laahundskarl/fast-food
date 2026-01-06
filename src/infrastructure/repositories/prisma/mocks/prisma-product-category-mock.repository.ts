import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IProductCategory } from '#/domain/entities/product-category.entity';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';

export class PrismaProductCategoryMockRepository implements IProductCategoryRepository {
    async findById(_id: string, _includes: string[]): Promise<IProductCategory | null> {
        return Promise.resolve(null);
    }

    async list(_query?: ListProductCategoryDto): Promise<IProductCategory[]> {
        return Promise.resolve([]);
    }
}
