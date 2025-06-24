import { ProductListDto } from '#/dto/product.dto';
import { Product } from '#/entities/product.entity';
import { IProductRepository } from '#/repositories/product.repository';

export class ListProductUseCase {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(query?: ProductListDto): Promise<Product[]> {
        return await this.productRepository.list(query);
    }
}
