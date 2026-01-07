import { Product } from '#/domain/entities/product.entity';
import { DeleteResponse } from '#/interfaces/http/schemas/common/util.schema';
import { ProductResponse } from '#/interfaces/http/schemas/product/product-response.schema';

export class ProductPresenter {
    static toHTTP(product: Product): ProductResponse {
        return {
            id: product.id,
            name: product.name,
            value: product.value,
            description: product.description ?? null,
            ...(product.category && {
                category: {
                    id: product.category.id,
                    name: product.category.name,
                },
            }),
        };
    }

    static toDeleteResponse(): DeleteResponse {
        return { message: 'Product deleted successfully' };
    }
}
