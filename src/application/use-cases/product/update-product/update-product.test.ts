import { describe, expect, it } from 'vitest';

import { UpdateProduct } from '#/application/use-cases/product/update-product/update-product';
import { Product } from '#/domain/entities/product.entity';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { NotFoundError } from '#/domain/errors';
import * as productMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-mock.repository';
import * as productCategoryMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-category-mock.repository';

describe('update-product', () => {
    const productRepository = new productMock.PrismaProductMockRepository();
    const productCategoryRepository = new productCategoryMock.PrismaProductCategoryMockRepository();
    const updateProductUseCase = new UpdateProduct(productRepository, productCategoryRepository);

    const existingCategory = new ProductCategory({
        id: '1',
        name: 'Beverages',
    });

    const existingProduct = new Product({
        id: '1',
        name: 'Coca-Cola',
        value: 5.99,
        description: 'Refreshing beverage',
        category: existingCategory,
    });

    it('should update a product', async () => {
        productMock.mockProductFindById({ data: existingProduct });
        const updatedProduct = new Product({
            id: '1',
            name: 'Coca-Cola Zero',
            value: 5.99,
            description: 'Refreshing beverage',
            category: existingCategory,
        });
        const updateMock = productMock.mockProductUpdate({ data: updatedProduct });

        const result = await updateProductUseCase.execute('1', { name: 'Coca-Cola Zero' });

        expect(result).toMatchObject({
            name: 'Coca-Cola Zero',
            value: 5.99,
            description: 'Refreshing beverage',
        });
        expect(updateMock).toHaveBeenCalled();
    });

    it('should update a product with a new category', async () => {
        productMock.mockProductFindById({ data: existingProduct });
        const newCategory = new ProductCategory({
            id: '2',
            name: 'Snacks',
        });
        productCategoryMock.mockProductCategoryFindById({ data: newCategory });
        const updatedProduct = new Product({
            id: '1',
            name: 'Coca-Cola',
            value: 5.99,
            description: 'Refreshing beverage',
            category: newCategory,
        });
        const updateMock = productMock.mockProductUpdate({ data: updatedProduct });

        const result = await updateProductUseCase.execute('1', { categoryId: '2' });

        expect(result.category).toMatchObject({
            id: '2',
            name: 'Snacks',
        });
        expect(updateMock).toHaveBeenCalled();
    });

    it('should throw NotFoundError if product does not exist', async () => {
        productMock.mockProductFindById({ empty: true });

        await expect(updateProductUseCase.execute('999', { name: 'New Name' })).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError if category does not exist when updating category', async () => {
        productMock.mockProductFindById({ data: existingProduct });
        productCategoryMock.mockProductCategoryFindById({ empty: true });

        await expect(updateProductUseCase.execute('1', { categoryId: '999' })).rejects.toThrow(NotFoundError);
    });
});
