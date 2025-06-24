import { ProductUpdateDto } from '#/dto/product.dto';
import { Product } from '#/entities/product.entity';
import { NotFoundError } from '#/errors/app-error';
import { IProductRepository } from '#/repositories/product.repository';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(id: string, request: ProductUpdateDto): Promise<any> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        const updateProduct = new Product({
            name: request.name ?? product.name,
            value: request.value ?? product.value,
            description: request.description ?? product.description,
            categoryId: request.categoryId ?? product.categoryId,
        });
        return await this.productRepository.update(id, updateProduct);
    }
}
