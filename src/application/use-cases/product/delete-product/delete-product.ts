import { inject, injectable } from 'inversify';

import { IDeleteProductUseCase } from '#/application/use-cases/product/delete-product/delete-product.use-case';
import { NotFoundError } from '#/domain/errors';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class DeleteProduct implements IDeleteProductUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
    ) {}

    async execute(id: string): Promise<void> {
        this.logger.info('Deleting product', { productId: id });

        const product = await this.productRepository.findById(id);

        if (!product) {
            this.logger.warn('Product deletion failed - not found', { productId: id });
            throw new NotFoundError('Product not found');
        }

        await this.productRepository.destroy(id);

        this.logger.info('Product deleted successfully', { productId: id, productName: product.name });
    }
}
