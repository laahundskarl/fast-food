import { ProductCategory } from '#/entities/product-category.entity';
import { NotFoundError } from '#/errors/app-error';
import { ProductCategoryRepository } from '#/repositories/product-category.repository';

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
