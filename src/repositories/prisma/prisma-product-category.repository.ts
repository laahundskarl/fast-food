import { PrismaClient } from '@prisma/client';

import { ProductCategoryListDto } from '#/dto/product-category.dto';
import { ProductCategory } from '#/entities/product-category.entity';
import { PrismaProductCategoryMapper } from '#/mappers/prisma/prisma-product-category.mapper';
import { ProductCategoryRepository } from '#/repositories/product-category.repository';

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
