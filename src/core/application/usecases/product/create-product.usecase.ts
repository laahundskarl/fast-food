import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductCreateDto } from '#/infrastructure/adapters/dto/product.dto';

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(product: ProductCreateDto): Promise<Product> {
        return await this.productRepository.create(product);
    }
}
