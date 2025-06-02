import { PrismaClient } from '@prisma/client';

import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';
import { ProductCategoryListDto } from '#/infrastructure/adapters/dto/product-category.dto';
import { PrismaProductCategoryMapper } from '#/infrastructure/persistence/prisma/mapper/prisma-product-category.mapper';

export class PrismaProductCategoryRepository implements ProductCategoryRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async get(id: string): Promise<ProductCategory | null> {
        const data = await this.prisma.productCategory.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });
        if (!data) return null;
        return PrismaProductCategoryMapper.toDomain(data);
    }

    async list(query?: ProductCategoryListDto): Promise<ProductCategory[]> {
        const data = await this.prisma.productCategory.findMany({
            where: {
                ...(query?.name && { name: { contains: query.name } }),
            },
            include: {
                products: true,
            },
        });
        return data.map(item => PrismaProductCategoryMapper.toDomain(item));
    }
}
