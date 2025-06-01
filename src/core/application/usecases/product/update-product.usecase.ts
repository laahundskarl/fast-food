import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductUpdateDto } from '#/infrastructure/adapters/dto/product.dto';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string, product: ProductUpdateDto): Promise<any> {
        return await this.productRepository.update(id, product);
    }
}
