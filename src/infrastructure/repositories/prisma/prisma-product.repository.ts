import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { Product } from '#/domain/entities/product.entity';
import { ProductFilterDto } from '#/domain/repositories/dto/product-filter.dto';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { PrismaProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product.mapper';

@injectable()
export class PrismaProductRepository implements IProductRepository {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.PrismaClient) private readonly prisma: PrismaClient,
    ) {}

    async create(product: Product): Promise<Product> {
        try {
            this.logger.debug('Creating product in database', { name: product.name, categoryId: product.category.id });
            const data = await this.prisma.product.create({
                data: PrismaProductMapper.toCreate(product),
                include: {
                    category: true,
                },
            });
            const result = PrismaProductMapper.toDomain(data);
            this.logger.debug('Product created in database', { productId: result.id });
            return result;
        } catch (error) {
            this.logger.error('Failed to create product in database', error as Error, { name: product.name });
            throw error;
        }
    }

    async findById(id: string): Promise<Product | null> {
        this.logger.debug('Finding product by ID', { productId: id });
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
        this.logger.debug('Finding multiple products by IDs', { productIds: ids, count: ids.length });
        const data = await this.prisma.product.findMany({
            where: {
                id: { in: ids },
            },
            include: {
                category: true,
            },
        });
        this.logger.debug('Products found', { found: data.length, requested: ids.length });
        return data.map(item => PrismaProductMapper.toDomain(item));
    }

    async list(filters?: ProductFilterDto): Promise<Product[]> {
        this.logger.debug('Listing products from database', { filters });
        const data = await this.prisma.product.findMany({
            where: {
                ...(filters?.name && { name: { contains: filters.name } }),
                ...(filters?.categoryId && { categoryId: { contains: filters.categoryId } }),
            },
            include: {
                category: true,
            },
        });
        this.logger.debug('Products listed from database', { count: data.length });
        return data.map(item => PrismaProductMapper.toDomain(item));
    }

    async update(id: string, product: Product): Promise<Product> {
        try {
            this.logger.debug('Updating product in database', { productId: id });
            const data = await this.prisma.product.update({
                data: PrismaProductMapper.toUpdate(product),
                where: {
                    id,
                },
                include: {
                    category: true,
                },
            });
            const result = PrismaProductMapper.toDomain(data);
            this.logger.debug('Product updated in database', { productId: result.id });
            return result;
        } catch (error) {
            this.logger.error('Failed to update product in database', error as Error, { productId: id });
            throw error;
        }
    }

    async destroy(id: string): Promise<void> {
        try {
            this.logger.debug('Deleting product from database', { productId: id });
            await this.prisma.product.delete({
                where: { id },
            });
            this.logger.debug('Product deleted from database', { productId: id });
        } catch (error) {
            this.logger.error('Failed to delete product from database', error as Error, { productId: id });
            throw error;
        }
    }
}
