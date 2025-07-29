import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { ProductCategory } from '#/domain/entities/product-category.entity';

export interface IListProductCategoryUseCase {
    execute(query?: ListProductCategoryDto): Promise<ProductCategory[]>;
}
