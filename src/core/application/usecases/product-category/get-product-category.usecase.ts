import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class GetProductCategoryUseCase {
    constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

    async execute(id: string): Promise<ProductCategory> {
        const category = await this.productCategoryRepository.get(id);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return category;
    }
}
