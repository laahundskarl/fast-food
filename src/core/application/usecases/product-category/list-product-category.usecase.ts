import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';
import { ProductCategoryListDTO } from '#/infrastructure/adapters/dto/product-category-list.dto';

export class ListProductCategoryUseCase {
    constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

    async execute(query?: ProductCategoryListDTO): Promise<any> {
        return await this.productCategoryRepository.list(query);
    }
}
