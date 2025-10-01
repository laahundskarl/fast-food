import { IProductCategory } from '#/domain/entities/product-category.entity';
import { ProductCategoryResponseDTO } from '#/interfaces/presenter/product-category/product-category-response.dto';

export class ProductCategoryPresenter {
    static toDTO(category: IProductCategory): ProductCategoryResponseDTO {
        return {
            id: category.id,
            name: category.name,
            ...(category.products && {
                products: category.products.map(product => ({
                    id: product.id,
                    name: product.name,
                    value: product.value,
                    description: product.description ?? null,
                })),
            }),
        };
    }
}
