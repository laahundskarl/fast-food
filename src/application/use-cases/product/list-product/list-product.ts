import { inject, injectable } from 'inversify';

import { IListProductUseCase } from '#/application/use-cases/product/list-product/list-product.use-case';
import { Product } from '#/domain/entities/product.entity';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { ProductQueryRequest } from '#/interfaces/http/schemas/product/product-request.schema';

@injectable()
export class ListProduct implements IListProductUseCase {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
    ) {}

    async execute(query?: ProductQueryRequest): Promise<Product[]> {
        this.logger.info('Listing products', { filters: query });

        const products = await this.productRepository.list(query);

        this.logger.info('Products listed successfully', { count: products.length });

        return products;
    }
}
