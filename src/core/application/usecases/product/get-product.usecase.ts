import { ProductRepository } from '#/core/domain/repositories/product.repository';

export class GetProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string): Promise<any> {
        return await this.productRepository.get(id);
    }
}
