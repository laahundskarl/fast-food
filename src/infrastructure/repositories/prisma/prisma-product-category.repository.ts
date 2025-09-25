import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { IProductCategory } from '#/domain/entities/product-category.entity';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { TYPES } from '#/infrastructure/config/types';
import { PrismaProductCategoryMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product-category.mapper';

@injectable()
export class PrismaProductCategoryRepository implements IProductCategoryRepository {
    constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}

    async findById(id: string, withProducts: boolean): Promise<IProductCategory | null> {
        const include = withProducts ? { products: true } : {};

        const data = await this.prisma.productCategory.findFirst({
            where: { id },
            include,
        });
        if (!data) return null;
        return withProducts
            ? PrismaProductCategoryMapper.toDomain(data)
            : PrismaProductCategoryMapper.toDomainSimple(data);
    }

    async list(query?: ListProductCategoryDto): Promise<IProductCategory[]> {
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
