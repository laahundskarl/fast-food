import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class GetProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        return product;
    }
}
