import { ProductCategory } from '#/domain/entities/product-category.entity';
import { ProductCategoryListDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';

export interface IProductCategoryRepository {
    get(id: string): Promise<ProductCategory | null>;
    list(query?: ProductCategoryListDto): Promise<ProductCategory[]>;
}
