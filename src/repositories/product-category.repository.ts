import { ProductCategoryListDto } from '#/dto/product-category.dto';
import { ProductCategory } from '#/entities/product-category.entity';

export interface ProductCategoryRepository {
    get(id: string): Promise<ProductCategory | null>;
    list(query?: ProductCategoryListDto): Promise<ProductCategory[]>;
}
