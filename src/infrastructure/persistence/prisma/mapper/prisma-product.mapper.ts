import { Prisma } from '@prisma/client';

import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { ProductWithCategory } from '#/infrastructure/persistence/prisma/types/product.type';

export class PrismaProductMapper {
    static toDomain(data: ProductWithCategory): Product {
        return new Product(
            data.name,
            data.value,
            data.description,
            undefined,
            data.id,
            new ProductCategory(data.category.name, data.category.id),
        );
    }

    static toCreate(data: Product): Prisma.ProductCreateInput {
        return {
            name: data.name,
            value: data.value,
            description: data.description,
            category: {
                connect: { id: data.categoryId },
            },
        };
    }

    static toUpdate(data: Product): Prisma.ProductUpdateInput {
        return {
            name: data.name,
            value: data.value,
            description: data.description,
            category: {
                connect: { id: data.categoryId },
            },
        };
    }
}
