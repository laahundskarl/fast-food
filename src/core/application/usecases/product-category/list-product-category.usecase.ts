import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';
import { ProductCategoryListDto } from '#/infrastructure/adapters/dto/product-category.dto';

export class ListProductCategoryUseCase {
    constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

    async execute(query?: ProductCategoryListDto): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.list(query);
    }
}
