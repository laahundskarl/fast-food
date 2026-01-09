import { describe, expect, it } from 'vitest';

import { ProductCategory } from '#/domain/entities/product-category.entity';
import { PrismaProductCategoryMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product-category.mapper';

describe('PrismaProductCategoryMapper', () => {
    describe('toDomain', () => {
        it('should map prisma product category data to domain ProductCategory entity', () => {
            const mockCategoryData = {
                id: 'category-123',
                name: 'Beverages',
                createdAt: new Date('2023-01-01T00:00:00Z'),
                updatedAt: new Date('2023-01-01T00:00:00Z'),
            };

            const category = PrismaProductCategoryMapper.toDomain(mockCategoryData);

            expect(category).toBeInstanceOf(ProductCategory);
            expect(category.id).toBe(mockCategoryData.id);
            expect(category.name).toBe(mockCategoryData.name);
            expect(category.products).toBeUndefined();
        });

        it('should map prisma product category data with products to domain ProductCategory entity', () => {
            const mockCategoryDataWithProducts = {
                id: 'category-456',
                name: 'Snacks',
                products: [
                    {
                        id: 'product-1',
                        name: 'Chips',
                        value: 3.99,
                        categoryId: 'category-456',
                        description: 'Crispy potato chips',
                        createdAt: new Date('2023-01-01T00:00:00Z'),
                        updatedAt: new Date('2023-01-01T00:00:00Z'),
                    },
                    {
                        id: 'product-2',
                        name: 'Cookies',
                        value: 4.99,
                        categoryId: 'category-456',
                        description: 'Chocolate cookies',
                        createdAt: new Date('2023-01-01T00:00:00Z'),
                        updatedAt: new Date('2023-01-01T00:00:00Z'),
                    },
                ],
                createdAt: new Date('2023-01-01T00:00:00Z'),
                updatedAt: new Date('2023-01-01T00:00:00Z'),
            };

            const category = PrismaProductCategoryMapper.toDomain(mockCategoryDataWithProducts);

            expect(category).toBeInstanceOf(ProductCategory);
            expect(category.id).toBe(mockCategoryDataWithProducts.id);
            expect(category.name).toBe(mockCategoryDataWithProducts.name);
            expect(category.products).toBeDefined();
            expect(category.products).toHaveLength(2);
        });
    });
});
