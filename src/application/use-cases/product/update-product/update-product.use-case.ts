import { Product } from '#/domain/entities/product.entity';
import { ProductUpdateRequest } from '#/interfaces/http/schemas/product/product-request.schema';

export interface IUpdateProductUseCase {
    execute(id: string, request: ProductUpdateRequest): Promise<Product>;
}
