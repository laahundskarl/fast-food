import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { IProduct } from '#/domain/entities/product.entity';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/di/types';
import { PrismaProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product.mapper';

@injectable()
export class PrismaProductRepository implements IProductRepository {
    constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) { }

    async create(product: IProduct): Promise<IProduct> {
        const data = await this.prisma.product.create({
            data: PrismaProductMapper.toCreate(product),
            include: {
                category: true,
            },
        });
        return PrismaProductMapper.toDomain(data);
    }

    async findById(id: string): Promise<IProduct | null> {
        const data = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        if (!data) return null;
        return PrismaProductMapper.toDomain(data);
    }

    async findMany(ids: string[]): Promise<IProduct[]> {
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

    async list(query?: ListProductDto): Promise<IProduct[]> {
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

    async update(id: string, product: IProduct): Promise<IProduct> {
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
