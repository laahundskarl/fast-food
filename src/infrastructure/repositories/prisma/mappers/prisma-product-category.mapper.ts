import { ProductCategory as PrismaProductCategory, Product as PrismaProduct } from '@prisma/client';

import { ProductCategory, ProductCategoryPayload } from '#/domain/entities/product-category.entity';
import { PrismaProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product.mapper';

type PrismaProductCategoryWithProducts = PrismaProductCategory & {
    products: PrismaProduct[];
};

export class PrismaProductCategoryMapper {
    static toDomain(data: PrismaProductCategoryWithProducts): ProductCategory {
        return new ProductCategory({
            id: data.id,
            name: data.name,
            ...(data.products && {
                products: data.products.map((product: any) => PrismaProductMapper.toDomain(product)),
            }),
        } as ProductCategoryPayload);
    }
}
