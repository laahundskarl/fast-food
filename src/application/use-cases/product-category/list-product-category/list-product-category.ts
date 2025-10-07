import { inject, injectable } from 'inversify';

import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IListProductCategoryUseCase } from '#/application/use-cases/product-category/list-product-category/list-product-category.use-case';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class ListProductCategory implements IListProductCategoryUseCase {
    constructor(
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(query?: ListProductCategoryDto): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.list(query);
    }
}
