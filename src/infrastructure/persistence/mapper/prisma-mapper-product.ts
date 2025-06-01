import { Prisma } from '@prisma/client';

import { ProductCreateDto, ProductUpdateDto } from '#/infrastructure/adapters/dto/product.dto';

export class PrismaMapperProduct {
    static mapToPrismaCreateInput(product: ProductCreateDto): Prisma.ProductCreateInput {
        return {
            name: product.name,
            value: product.value,
            description: product.description,
            category: {
                connect: { id: product.categoryId },
            },
        };
    }

    static mapToPrismaUpdateInput(product: ProductUpdateDto): Prisma.ProductUpdateInput {
        return {
            ...(product.name && { name: product.name }),
            ...(product.description && { description: product.description }),
            ...(product.value && { value: product.value }),
            ...(product.categoryId && { category: { connect: { id: product.categoryId } } }),
        };
    }
}
