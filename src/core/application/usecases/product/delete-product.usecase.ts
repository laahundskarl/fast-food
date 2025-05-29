import { ProductRepository } from '#/core/domain/repositories/product.repository';

export class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string): Promise<void> {
        return await this.productRepository.destroy(id);
    }
}
