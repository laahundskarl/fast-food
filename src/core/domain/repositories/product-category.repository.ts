import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { ProductCategoryListDto } from '#/infrastructure/adapters/dto/product-category.dto';

export interface ProductCategoryRepository {
    get(id: string): Promise<ProductCategory | null>;
    list(query?: ProductCategoryListDto): Promise<ProductCategory[]>;
}
