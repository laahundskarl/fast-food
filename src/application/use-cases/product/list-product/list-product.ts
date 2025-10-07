import { inject, injectable } from 'inversify';

import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { IListProductUseCase } from '#/application/use-cases/product/list-product/list-product.use-case';
import { Product } from '#/domain/entities/product.entity';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class ListProduct implements IListProductUseCase {
    constructor(@inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository) {}

    async execute(query?: ListProductDto): Promise<Product[]> {
        return await this.productRepository.list(query);
    }
}
