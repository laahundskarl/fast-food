import { ProductCategory } from '#/domain/entities/product-category.entity';
import { ProductCategoryListQueryRequest } from '#/interfaces/http/schemas/product-category/product-category-request.schema';

export interface IListProductCategoryUseCase {
    execute(query?: ProductCategoryListQueryRequest): Promise<ProductCategory[]>;
}
