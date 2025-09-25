import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IProductCategory } from '#/domain/entities/product-category.entity';

export interface IProductCategoryRepository {
    findById(id: string, withProducts: boolean): Promise<IProductCategory | null>;
    list(query?: ListProductCategoryDto): Promise<IProductCategory[]>;
}
