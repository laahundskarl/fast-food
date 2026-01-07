import { inject, injectable } from 'inversify';

import { IUpdateProductUseCase } from '#/application/use-cases/product/update-product/update-product.use-case';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { Product } from '#/domain/entities/product.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { ProductUpdateRequest } from '#/interfaces/http/schemas/product/product-request.schema';

@injectable()
export class UpdateProduct implements IUpdateProductUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(id: string, request: ProductUpdateRequest): Promise<Product> {
        this.logger.info('Updating product', { productId: id, updates: request });

        const product = await this.findProductOrFail(id);
        const category = await this.resolveCategoryIfProvided(request.categoryId);

        const updateProduct = new Product({
            name: request.name ?? product.name,
            value: request.value ?? product.value,
            description: request.description ?? product.description,
            category: category ?? product.category,
        });
        const result = await this.productRepository.update(id, updateProduct);

        this.logger.info('Product updated successfully', {
            productId: id,
            productName: result.name,
            categoryName: result.category.name,
        });

        return result;
    }

    private async findProductOrFail(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            this.logger.warn('Product update failed - not found', { productId: id });
            throw new NotFoundError('Product not found');
        }

        return product;
    }

    private async resolveCategoryIfProvided(categoryId?: string): Promise<ProductCategory | null> {
        if (!categoryId) {
            return null;
        }

        const category = await this.productCategoryRepository.findById(categoryId, []);

        if (!category) {
            this.logger.warn('Product update failed - category not found', { categoryId });
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        return category;
    }
}
