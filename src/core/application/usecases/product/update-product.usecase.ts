import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductUpdateDTO } from '#/infrastructure/adapters/dto/product-list.dto';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string, product: ProductUpdateDTO): Promise<any> {
        return await this.productRepository.update(id, product);
    }
}
