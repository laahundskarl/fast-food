import { Product } from '#/domain/entities/product.entity';
import { ProductQueryRequest } from '#/interfaces/http/schemas/product/product-request.schema';

export interface IListProductUseCase {
    execute(query?: ProductQueryRequest): Promise<Product[]>;
}
