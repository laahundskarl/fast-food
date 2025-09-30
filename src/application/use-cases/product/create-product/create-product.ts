import { inject, injectable } from 'inversify';

import { CreateProductDto } from '#/application/use-cases/product/create-product/create-product.dto';
import { ICreateProductUseCase } from '#/application/use-cases/product/create-product/create-product.use-case';
import { IProduct, Product } from '#/domain/entities/product.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class CreateProduct implements ICreateProductUseCase {
    constructor(
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(request: CreateProductDto): Promise<IProduct> {
        const category = await this.productCategoryRepository.findById(request.categoryId, false);
        if (!category) {
            throw new NotFoundError(`Category with id ${request.categoryId} not found`);
        }
        const product = new Product({
            name: request.name,
            value: request.value,
            description: request.description ?? null,
            category: category,
        });
        return await this.productRepository.create(product);
    }
}
