import { Product } from '#/domain/entities/product.entity';
import { ProductCreateRequest } from '#/interfaces/http/schemas/product/product-request.schema';

export interface ICreateProductUseCase {
    execute(request: ProductCreateRequest): Promise<Product>;
}
