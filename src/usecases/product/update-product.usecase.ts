import { ProductUpdateDto } from '#/dto/product.dto';
import { Product } from '#/entities/product.entity';
import { NotFoundError } from '#/errors/app-error';
import { ProductRepository } from '#/repositories/product.repository';

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: string, request: ProductUpdateDto): Promise<any> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        const updateProduct = new Product({
            name: request.name ?? product.name,
            value: request.value ?? product.value,
            description: request.description ?? product.description,
            /**
             * TODO: ERRO AO PASSAR CATEGORYID
             */
            // categoryId: request.categoryId ?? product.category?.id ?? '',
        });
        return await this.productRepository.update(id, updateProduct);
    }
}
