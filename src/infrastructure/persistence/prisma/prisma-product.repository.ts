import { PrismaClient } from '@prisma/client';

import { Product } from '#/core/domain/entities/product.entity';
import { ProductRepository } from '#/core/domain/repositories/product.repository';
import { ProductListDto } from '#/infrastructure/adapters/dto/product.dto';
import { PrismaProductMapper } from '#/infrastructure/persistence/prisma/mapper/prisma-product.mapper';

export class PrismaProductRepository implements ProductRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(product: Product): Promise<Product> {
        const data = await this.prisma.product.create({
            data: PrismaProductMapper.toCreate(product),
            include: {
                category: true,
            },
        });
        return PrismaProductMapper.toDomain(data);
    }

    async findById(id: string): Promise<Product | null> {
        const data = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        if (!data) return null;
        return PrismaProductMapper.toDomain(data);
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
        return data.map(item => PrismaProductMapper.toDomain(item));
    }

    async update(id: string, product: Product): Promise<Product> {
        const data = await this.prisma.product.update({
            data: PrismaProductMapper.toUpdate(product),
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
        return PrismaProductMapper.toDomain(data);
    }

    async destroy(id: string): Promise<void> {
        await this.prisma.product.delete({
            where: { id },
        });
    }
}
