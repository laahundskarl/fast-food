import { Product as PrismaProduct } from '@prisma/client';

import { IProduct } from '#/domain/entities/product.entity';

export interface IPrismaProductMapper {
    toCreate(product: IProduct): Omit<PrismaProduct, 'createdAt' | 'updatedAt'>;
    toUpdate(product: IProduct): Omit<PrismaProduct, 'createdAt' | 'updatedAt'>;
    toDomain(product: PrismaProduct & { category?: any }): IProduct;
}
