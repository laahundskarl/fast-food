import { inject, injectable } from 'inversify';

import { IDeleteProductUseCase } from '#/application/use-cases/product/delete-product/delete-product.use-case';
import { NotFoundError } from '#/domain/errors';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class DeleteProduct implements IDeleteProductUseCase {
    constructor(@inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository) {}

    async execute(id: string): Promise<void> {
        const client = await this.productRepository.findById(id);
        if (!client) {
            throw new NotFoundError('Product not found');
        }
        return await this.productRepository.destroy(id);
    }
}
