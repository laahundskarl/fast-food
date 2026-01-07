import { describe, expect, it } from 'vitest';

import { ProductCategory } from '#/domain/entities/product-category.entity';
import { Product } from '#/domain/entities/product.entity';
import { PrismaProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product.mapper';

describe('PrismaProductMapper', () => {
    const mockCategory = {
        id: 'category-123',
        name: 'Beverages',
    };

    const mockProductData = {
        id: 'product-123',
        name: 'Coca-Cola',
        value: 5.99,
        description: 'Refreshing soft drink',
        category: mockCategory,
    };

    describe('toDomain', () => {
        it('should map prisma product data to domain Product entity', () => {
            const product = PrismaProductMapper.toDomain(mockProductData);

            expect(product).toBeInstanceOf(Product);
            expect(product.id).toBe(mockProductData.id);
            expect(product.name).toBe(mockProductData.name);
            expect(product.value).toBe(mockProductData.value);
            expect(product.description).toBe(mockProductData.description);
            expect(product.category.id).toBe(mockCategory.id);
            expect(product.category.name).toBe(mockCategory.name);
        });

        it('should map prisma product data without category', () => {
            const productDataWithoutCategory = {
                id: 'product-456',
                name: 'Water',
                value: 2.99,
                description: null,
            };

            const product = PrismaProductMapper.toDomain(productDataWithoutCategory);

            expect(product).toBeInstanceOf(Product);
            expect(product.id).toBe(productDataWithoutCategory.id);
            expect(product.name).toBe(productDataWithoutCategory.name);
            expect(product.description).toBeNull();
        });
    });

    describe('toCreate', () => {
        it('should map domain Product to Prisma create input', () => {
            const category = new ProductCategory({ id: 'category-123', name: 'Beverages' });
            const product = new Product({
                name: 'Orange Juice',
                value: 7.99,
                description: 'Fresh orange juice',
                category,
            });

            const createInput = PrismaProductMapper.toCreate(product);

            expect(createInput).toEqual({
                name: 'Orange Juice',
                value: 7.99,
                description: 'Fresh orange juice',
                category: {
                    connect: { id: 'category-123' },
                },
            });
        });
    });

    describe('toUpdate', () => {
        it('should map domain Product to Prisma update input', () => {
            const category = new ProductCategory({ id: 'category-456', name: 'Snacks' });
            const product = new Product({
                id: 'product-789',
                name: 'Updated Product',
                value: 9.99,
                description: 'Updated description',
                category,
            });

            const updateInput = PrismaProductMapper.toUpdate(product);

            expect(updateInput).toEqual({
                name: 'Updated Product',
                value: 9.99,
                description: 'Updated description',
                category: {
                    connect: { id: 'category-456' },
                },
            });
        });
    });
});
