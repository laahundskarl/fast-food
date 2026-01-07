import { inject, injectable } from 'inversify';

import { IGetProductUseCase } from '#/application/use-cases/product/get-product/get-product.use-case';
import { Product } from '#/domain/entities/product.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetProduct implements IGetProductUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
    ) {}

    async execute(id: string): Promise<Product> {
        this.logger.info('Fetching product', { productId: id });

        const product = await this.productRepository.findById(id);

        if (!product) {
            this.logger.warn('Product not found', { productId: id });
            throw new NotFoundError('Product not found');
        }

        this.logger.info('Product fetched successfully', {
            productId: id,
            productName: product.name,
            categoryName: product.category.name,
        });

        return product;
    }
}
