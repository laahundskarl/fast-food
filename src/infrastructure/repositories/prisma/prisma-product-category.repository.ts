import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { ProductCategory } from '#/domain/entities/product-category.entity';
import { ProductCategoryFiltersDto } from '#/domain/repositories/dto/product-category-filters.dto';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { PrismaProductCategoryMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product-category.mapper';

@injectable()
export class PrismaProductCategoryRepository implements IProductCategoryRepository {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.PrismaClient) private readonly prisma: PrismaClient,
    ) {}

    async findById(id: string, include?: string[]): Promise<ProductCategory | null> {
        this.logger.debug('Finding product category by ID', { categoryId: id, include });
        const data = await this.prisma.productCategory.findFirst({
            where: { id },
            include: {
                products: include?.includes('products') ?? false,
            },
        });
        if (!data) return null;
        return PrismaProductCategoryMapper.toDomain(data);
    }

    async list(filters?: ProductCategoryFiltersDto): Promise<ProductCategory[]> {
        this.logger.debug('Listing product categories from database', { filters });
        const data = await this.prisma.productCategory.findMany({
            where: {
                ...(filters?.name && { name: { contains: filters.name } }),
            },
            include: {
                products: true,
            },
        });
        this.logger.debug('Product categories listed from database', { count: data.length });
        return data.map(item => PrismaProductCategoryMapper.toDomain(item));
    }
}
