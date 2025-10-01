import { inject, injectable } from 'inversify';

import { IGetProductCategoryUseCase } from '#/application/use-cases/product-category/get-product-category/get-product-category.use-case';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetProductCategory implements IGetProductCategoryUseCase {
    constructor(
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(id: string, includes: string[]): Promise<ProductCategory> {
        const category = await this.productCategoryRepository.findById(id, includes);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return category;
    }
}
