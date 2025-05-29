import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductListDTO } from '#/infrastructure/adapters/dto/product-list.dto';

export class ListProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(query?: ProductListDTO): Promise<any> {
        return await this.productRepository.list(query);
    }
}
