import { ProductCategoryListDTO } from '#/infrastructure/adapters/dto/product-category-list.dto';

export interface ProductCategoryRepository {
    list(query?: ProductCategoryListDTO): Promise<any>;
    get(id: string): Promise<any>;
}
