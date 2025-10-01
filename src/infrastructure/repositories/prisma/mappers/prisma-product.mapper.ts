import { Prisma } from '@prisma/client';

import { Product, ProductPayload } from '#/domain/entities/product.entity';
import { PrismaProductCategoryMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product-category.mapper';

export class PrismaProductMapper {
    static toDomain(data: any): Product {
        return new Product({
            id: data.id,
            name: data.name,
            value: data.value,
            description: data.description,
            ...(data.category && {
                category: PrismaProductCategoryMapper.toDomain(data.category),
            }),
        } as ProductPayload);
    }

    static toCreate(data: Product): Prisma.ProductCreateInput {
        return {
            name: data.name,
            value: data.value,
            description: data.description,
            category: {
                connect: { id: data.category.id },
            },
        };
    }

    static toUpdate(data: Product): Prisma.ProductUpdateInput {
        return {
            name: data.name,
            value: data.value,
            description: data.description,
            category: {
                connect: { id: data.category.id },
            },
        };
    }
}
