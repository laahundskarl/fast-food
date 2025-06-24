import { PrismaClient } from '@prisma/client';

import { ProductListDto } from '#/dto/product.dto';
import { Product } from '#/entities/product.entity';
import { PrismaProductMapper } from '#/mappers/prisma/prisma-product.mapper';
import { IProductRepository } from '#/repositories/product.repository';

export class PrismaProductRepository implements IProductRepository {
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

    async findMany(ids: string[]): Promise<Product[]> {
        const data = await this.prisma.product.findMany({
            where: {
                id: { in: ids },
            },
            include: {
                category: true,
            },
        });
        return data.map(item => PrismaProductMapper.toDomain(item));
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
