import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductCreateDTO } from '#/infrastructure/adapters/dto/product-list.dto';

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(product: ProductCreateDTO): Promise<any> {
        return await this.productRepository.create(product);
    }
}
