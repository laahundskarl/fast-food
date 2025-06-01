import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductListDto } from '#/infrastructure/adapters/dto/product.dto';

export class ListProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(query?: ProductListDto): Promise<Product[]> {
        return await this.productRepository.list(query);
    }
}
