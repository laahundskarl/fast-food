import { inject, injectable } from 'inversify';

import { UpdateProductDto } from '#/application/use-cases/product/update-product/update-product.dto';
import { IUpdateProductUseCase } from '#/application/use-cases/product/update-product/update-product.use-case';
import { IProduct, Product } from '#/domain/entities/product.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class UpdateProduct implements IUpdateProductUseCase {
    constructor(
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
        @inject(TYPES.ProductCategoryRepository) private readonly productCategoryRepository: IProductCategoryRepository,
    ) {}

    async execute(id: string, request: UpdateProductDto): Promise<IProduct> {
        let category = null;
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        if (request.categoryId) {
            category = await this.productCategoryRepository.findById(request.categoryId, false);
            if (!category) {
                throw new NotFoundError(`Category with id ${request.categoryId} not found`);
            }
        }
        const updateProduct = new Product({
            name: request.name ?? product.name,
            value: request.value ?? product.value,
            description: request.description ?? product.description,
            category: category ?? product.category,
        });
        return await this.productRepository.update(id, updateProduct);
    }
}
