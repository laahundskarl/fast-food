import { Prisma } from '@prisma/client';

import { Product } from '#/domain/entities/product.entity';
import { PrismaProductCategoryMapper } from '#/interfaces/repositories/prisma/mappers/prisma-product-category.mapper';

export class PrismaProductMapper {
    static toDomain(data: any): Product {
        return new Product({
            id: data.id,
            name: data.name,
            value: data.value,
            description: data.description,
            category: PrismaProductCategoryMapper.toDomainSimple(data.category),
        });
    }

    static toDomainSimple(data: any): Product {
        return new Product({
            id: data.id,
            name: data.name,
            value: data.value,
            description: data.description,
        });
    }

    static toCreate(data: Product): Prisma.ProductCreateInput {
        return {
            name: data.name,
            value: data.value,
            description: data.description,
            category: {
                connect: { id: data.category!.id },
            },
        };
    }

    static toUpdate(data: Product): Prisma.ProductUpdateInput {
        return {
            name: data.name,
            value: data.value,
            description: data.description,
            category: {
                connect: { id: data.category!.id },
            },
        };
    }
}
