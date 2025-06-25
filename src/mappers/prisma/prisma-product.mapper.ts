import { Prisma } from '@prisma/client';

import { ProductCategory } from '#/entities/product-category.entity';
import { CreateProduct, Product } from '#/entities/product.entity';
import { ProductWithCategory } from '#/types/product.type';

export class PrismaProductMapper {
    static toDomain(data: ProductWithCategory): Product {
        return new Product({
            name: data.name,
            value: data.value,
            description: data.description,
            id: data.id,
            category: new ProductCategory({
                name: data.category.name,
                id: data.category.id,
            }),
        });
    }

    static toCreate(data: CreateProduct): Prisma.ProductCreateInput {
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
