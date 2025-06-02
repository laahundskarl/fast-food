import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { ProductUpdateDto } from '#/infrastructure/adapters/dto/product.dto';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string, request: ProductUpdateDto): Promise<any> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        const updateProduct = new Product(
            request.name ?? product.name,
            request.value ?? product.value,
            request.description ?? product.description,
        );
        return await this.productRepository.update(id, updateProduct);
    }
}
