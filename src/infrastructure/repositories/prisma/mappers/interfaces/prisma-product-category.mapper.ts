import { ProductCategory as PrismaProductCategory } from '@prisma/client';

import { IProductCategory } from '#/domain/entities/product-category.entity';

export interface IPrismaProductCategoryMapper {
    toCreate(category: IProductCategory): Omit<PrismaProductCategory, 'createdAt' | 'updatedAt'>;
    toUpdate(category: IProductCategory): Omit<PrismaProductCategory, 'createdAt' | 'updatedAt'>;
    toDomain(category: PrismaProductCategory & { products?: any[] }): IProductCategory;
    toDomainSimple(category: PrismaProductCategory): IProductCategory;
}
