import { inject, injectable } from 'inversify';

import { ICreateProductUseCase } from '#/application/use-cases/product/create-product/create-product.use-case';
import { Product } from '#/domain/entities/product.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { ProductCreateRequest } from '#/interfaces/http/schemas/product/product-request.schema';

@injectable()
export class CreateProduct implements ICreateProductUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(request: ProductCreateRequest): Promise<Product> {
        this.logger.info('Creating new product', { name: request.name, categoryId: request.categoryId });

        const category = await this.productCategoryRepository.findById(request.categoryId, []);

        if (!category) {
            this.logger.warn('Product creation failed - category not found', { categoryId: request.categoryId });
            throw new NotFoundError(`Category with id ${request.categoryId} not found`);
        }

        const product = new Product({
            name: request.name,
            value: request.value,
            description: request.description ?? null,
            category: category,
        });

        const createdProduct = await this.productRepository.create(product);

        this.logger.info('Product created successfully', {
            productId: createdProduct.id,
            productName: createdProduct.name,
            categoryName: category.name,
        });

        return createdProduct;
    }
}
