import { ProductCategory } from '#/entities/product-category.entity';
import { Product } from '#/entities/product.entity';
import { ProductCategoryWithProducts } from '#/types/product-category.type';

export class PrismaProductCategoryMapper {
    static toDomain(data: ProductCategoryWithProducts): ProductCategory {
        return new ProductCategory({
            name: data.name,
            id: data.id,
            products: data.products.map(
                product =>
                    new Product({
                        name: product.name,
                        value: product.value,
                        description: product.description,
                        id: product.id,
                    }),
            ),
        });
    }
}
