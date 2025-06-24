import { ProductCategoryListDto } from '#/dto/product-category.dto';
import { ProductCategory } from '#/entities/product-category.entity';

export interface IProductCategoryRepository {
    get(id: string): Promise<ProductCategory | null>;
    list(query?: ProductCategoryListDto): Promise<ProductCategory[]>;
}
