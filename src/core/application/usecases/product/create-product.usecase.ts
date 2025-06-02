import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductCreateDto } from '#/infrastructure/adapters/dto/product.dto';

export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(request: ProductCreateDto): Promise<Product> {
        const product = new Product(request.name, request.value, request.description ?? null);
        return await this.productRepository.create(product);
    }
}
