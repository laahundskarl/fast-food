import { ProductCreateDto } from '#/dto/product.dto';
import { CreateProduct, Product } from '#/entities/product.entity';
import { IProductRepository } from '#/repositories/product.repository';

export class CreateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(request: ProductCreateDto): Promise<Product> {
        const product = new CreateProduct({
            name: request.name,
            value: request.value,
            description: request.description ?? null,
            categoryId: request.categoryId,
        });
        return await this.productRepository.create(product);
    }
}
