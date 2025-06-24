import { ProductCategory } from '#/entities/product-category.entity';
import { NotFoundError } from '#/errors/app-error';
import { IProductCategoryRepository } from '#/repositories/product-category.repository';

export class GetProductCategoryUseCase {
    constructor(private readonly productCategoryRepository: IProductCategoryRepository) {}

    async execute(id: string): Promise<ProductCategory> {
        const category = await this.productCategoryRepository.get(id);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return category;
    }
}
