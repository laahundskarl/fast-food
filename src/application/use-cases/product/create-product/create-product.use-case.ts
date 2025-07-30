import { CreateProductDto } from '#/application/use-cases/product/create-product/create-product.dto';
import { Product } from '#/domain/entities/product.entity';

export interface ICreateProductUseCase {
    execute(request: CreateProductDto): Promise<Product>;
}
