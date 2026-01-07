import { describe, expect, it } from 'vitest';

import { CreateProduct } from '#/application/use-cases/product/create-product/create-product';
import { NotFoundError } from '#/domain/errors';
import * as productMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-mock.repository';
import * as productCategoryMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-category-mock.repository';

describe('create-product', () => {
    const productRepository = new productMock.PrismaProductMockRepository();
    const productCategoryRepository = new productCategoryMock.PrismaProductCategoryMockRepository();
    const createProductUseCase = new CreateProduct(productRepository, productCategoryRepository);

    it('should create a product', async () => {
        productCategoryMock.mockProductCategoryFindById({ empty: false });
        const createMock = productMock.mockProductCreate({});

        const result = await createProductUseCase.execute({
            name: 'Coca-Cola',
            value: 5.99,
            description: 'Refreshing beverage',
            categoryId: '1',
        });

        expect(result).toMatchObject({
            name: 'Coca-Cola',
            value: 5.99,
            description: 'Refreshing beverage',
        });
        expect(createMock).toHaveBeenCalled();
    });

    it('should throw NotFoundError if category does not exist', async () => {
        productCategoryMock.mockProductCategoryFindById({ empty: true });

        await expect(
            createProductUseCase.execute({
                name: 'Coca-Cola',
                value: 5.99,
                description: 'Refreshing beverage',
                categoryId: '999',
            }),
        ).rejects.toThrow(NotFoundError);
    });
});
