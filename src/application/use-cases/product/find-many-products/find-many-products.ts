import { inject, injectable } from 'inversify';

import { IFindManyProductsUseCase } from '#/application/use-cases/product/find-many-products/find-many-products.use-case';
import { Product } from '#/domain/entities/product.entity';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class FindManyProducts implements IFindManyProductsUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
    ) {}

    async execute(ids: string[]): Promise<Product[]> {
        this.logger.info('Finding multiple products', { productIds: ids, count: ids.length });

        const products = await this.productRepository.findMany(ids);

        this.logger.info('Products found', {
            requested: ids.length,
            found: products.length,
        });

        if (products.length !== ids.length) {
            const foundIds = products.map(p => p.id);
            const notFoundIds = ids.filter(id => !foundIds.includes(id));
            this.logger.warn('Some products not found', { notFoundIds });
        }

        return products;
    }
}
