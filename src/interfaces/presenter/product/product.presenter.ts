import { IProduct } from '#/domain/entities/product.entity';
import { ProductResponseDTO } from '#/interfaces/presenter/product/product-response.dto';

export class ProductPresenter {
    static toDTO(product: IProduct): ProductResponseDTO {
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
}
