import { inject, injectable } from 'inversify';

import { IGetProductUseCase } from '#/application/use-cases/product/get-product/get-product.use-case';
import { IProduct } from '#/domain/entities/product.entity';
import { NotFoundError } from '#/domain/errors';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class GetProduct implements IGetProductUseCase {
    constructor(@inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository) {}

    async execute(id: string): Promise<IProduct> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        return product;
    }
}
