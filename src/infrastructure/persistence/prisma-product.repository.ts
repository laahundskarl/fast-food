import { PrismaClient } from '@prisma/client';

import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductCreateDto, ProductListDto, ProductUpdateDto } from '#/infrastructure/adapters/dto/product.dto';
import { PrismaMapperProduct } from '#/infrastructure/persistence/mapper/prisma-mapper-product';

export class PrismaProductRepository implements ProductRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(product: ProductCreateDto): Promise<Product> {
        const data = await this.prisma.product.create({
            data: PrismaMapperProduct.mapToPrismaCreateInput(product),
            include: {
                category: true,
            },
        });
        return new Product(
            data.id,
            data.name,
            data.value,
            data.description,
            new ProductCategory(data.category.id, data.category.name),
        );
    }

    async findById(id: string): Promise<Product | null> {
        const data = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        if (!data) return null;
        return new Product(
            data.id,
            data.name,
            data.value,
            data.description,
            new ProductCategory(data.category.id, data.category.name),
        );
    }

    async list(query?: ProductListDto): Promise<Product[]> {
        const data = await this.prisma.product.findMany({
            where: {
                ...(query?.name && { name: { contains: query.name } }),
                ...(query?.categoryId && { categoryId: { contains: query.categoryId } }),
            },
            include: {
                category: true,
            },
        });
        return data.map(
            item =>
                new Product(
                    item.id,
                    item.name,
                    item.value,
                    item.description,
                    new ProductCategory(item.category.id, item.category.name),
                ),
        );
    }

    async update(id: string, product: ProductUpdateDto): Promise<Product> {
        const data = await this.prisma.product.update({
            data: PrismaMapperProduct.mapToPrismaUpdateInput(product),
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
        return new Product(
            data.id,
            data.name,
            data.value,
            data.description,
            new ProductCategory(data.category.id, data.category.name),
        );
    }

    async destroy(id: string): Promise<void> {
        await this.prisma.product.delete({
            where: { id },
        });
    }
}
