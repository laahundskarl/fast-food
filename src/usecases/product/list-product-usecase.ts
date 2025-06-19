import { ProductListDto } from '#/dto/product.dto';
import { Product } from '#/entities/product.entity';
import { ProductRepository } from '#/repositories/product.repository';

export class ListProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(query?: ProductListDto): Promise<Product[]> {
        return await this.productRepository.list(query);
    }
}
