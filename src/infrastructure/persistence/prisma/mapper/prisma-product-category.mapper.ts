import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { ProductCategoryWithProducts } from '#/infrastructure/persistence/prisma/types/product-category.type';

export class PrismaProductCategoryMapper {
    static toDomain(data: ProductCategoryWithProducts): ProductCategory {
        return new ProductCategory(
            data.name,
            data.id,
            data.products.map(
                product => new Product(product.name, product.value, product.description, undefined, product.id),
            ),
        );
    }
}
