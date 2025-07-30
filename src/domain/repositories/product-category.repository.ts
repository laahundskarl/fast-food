import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { ProductCategory } from '#/domain/entities/product-category.entity';

export interface IProductCategoryRepository {
    findById(id: string, withProducts: boolean): Promise<ProductCategory | null>;
    list(query?: ListProductCategoryDto): Promise<ProductCategory[]>;
}
