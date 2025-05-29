import { ProductCategoryUseCase } from '#/core/application/ports/product-category.use-case';
import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';
import { ProductCategoryListDTO } from '#/infrastructure/adapters/dto/product-category-list.dto';

export class ProductCategory implements ProductCategoryUseCase {
    constructor(private readonly repository: ProductCategoryRepository) {}

    async list(query: ProductCategoryListDTO): Promise<any> {
        return this.repository.list(query);
    }

    async get(id: string): Promise<any> {
        return this.repository.get(id);
    }
}
