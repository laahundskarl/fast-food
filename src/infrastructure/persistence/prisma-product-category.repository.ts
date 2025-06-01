import { PrismaClient } from '@prisma/client';

import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { ProductCategoryRepository } from '#/core/domain/repositories/product-category.repository';
import { ProductCategoryListDto } from '#/infrastructure/adapters/dto/product-category.dto';

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
        return new ProductCategory(
            data.id,
            data.name,
            data.products.map(product => new Product(product.id, product.name, product.value, product.description)),
        );
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
        return data.map(
            item =>
                new ProductCategory(
                    item.id,
                    item.name,
                    item.products.map(
                        product => new Product(product.id, product.name, product.value, product.description),
                    ),
                ),
        );
    }
}
