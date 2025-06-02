import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';

export class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string): Promise<void> {
        const client = await this.productRepository.findById(id);
        if (!client) {
            throw new NotFoundError('Product not found');
        }
        return await this.productRepository.destroy(id);
    }
}
