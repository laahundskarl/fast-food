import { ProductCategory } from '#/domain/entities/product-category.entity';
import { ProductCategoryResponseSchema } from '#/interfaces/http/schemas/product-category/product-category-response.schema';

export class ProductCategoryPresenter {
    static toHTTP(category: ProductCategory): ProductCategoryResponseSchema {
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
