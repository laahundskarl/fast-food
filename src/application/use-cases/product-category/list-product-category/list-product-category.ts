import { inject, injectable } from 'inversify';

import { IListProductCategoryUseCase } from '#/application/use-cases/product-category/list-product-category/list-product-category.use-case';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { ProductCategoryListQueryRequest } from '#/interfaces/http/schemas/product-category/product-category-request.schema';

@injectable()
export class ListProductCategory implements IListProductCategoryUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(query?: ProductCategoryListQueryRequest): Promise<ProductCategory[]> {
        this.logger.info('Listing product categories', { filters: query });

        const categories = await this.productCategoryRepository.list(query);

        this.logger.info('Product categories listed successfully', { count: categories.length });

        return categories;
    }
}
