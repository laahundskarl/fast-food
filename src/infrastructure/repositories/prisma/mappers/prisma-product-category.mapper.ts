import { ProductCategory } from '#/domain/entities/product-category.entity';
import { PrismaProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product.mapper';

export class PrismaProductCategoryMapper {
    static toDomain(data: any): ProductCategory {
        return new ProductCategory({
            id: data.id,
            name: data.name,
            products: data.products.map((product: any) => PrismaProductMapper.toDomainSimple(product)) || [],
        });
    }

    static toDomainSimple(data: any): ProductCategory {
        return new ProductCategory({
            id: data.id,
            name: data.name,
        });
    }
}
