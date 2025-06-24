import { NotFoundError } from '#/errors/app-error';
import { IProductRepository } from '#/repositories/product.repository';

export class DeleteProductUseCase {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(id: string): Promise<void> {
        const client = await this.productRepository.findById(id);
        if (!client) {
            throw new NotFoundError('Product not found');
        }
        return await this.productRepository.destroy(id);
    }
}
