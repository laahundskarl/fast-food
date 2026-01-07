import { inject, injectable } from 'inversify';

import { IGetProductCategoryUseCase } from '#/application/use-cases/product-category/get-product-category/get-product-category.use-case';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetProductCategory implements IGetProductCategoryUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(id: string, include: string[]): Promise<ProductCategory> {
        this.logger.info('Fetching product category', { categoryId: id, include });

        const category = await this.productCategoryRepository.findById(id, include);
        if (!category) {
            this.logger.warn('Product category not found', { categoryId: id });
            throw new NotFoundError('Category not found');
        }

        this.logger.info('Product category fetched successfully', { categoryId: id, categoryName: category.name });

        return category;
    }
}
