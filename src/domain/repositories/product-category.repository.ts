import { ProductCategory } from '#/domain/entities/product-category.entity';
import { ProductCategoryFiltersDto } from '#/domain/repositories/dto/product-category-filters.dto';

export interface IProductCategoryRepository {
    findById(id: string, includes: string[]): Promise<ProductCategory | null>;
    list(query?: ProductCategoryFiltersDto): Promise<ProductCategory[]>;
}
