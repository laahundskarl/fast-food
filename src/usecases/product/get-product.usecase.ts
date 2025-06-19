import { Product } from '#/entities/product.entity';
import { NotFoundError } from '#/errors/app-error';
import { ProductRepository } from '#/repositories/product.repository';

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
