import { describe, expect, it } from 'vitest';

import { GetProductCategory } from '#/application/use-cases/product-category/get-product-category/get-product-category';
import { NotFoundError } from '#/domain/errors';
import * as productCategoryMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-category-mock.repository';

describe('get-product-category', () => {
    const productCategoryRepository = new productCategoryMock.PrismaProductCategoryMockRepository();
    const getProductCategoryUseCase = new GetProductCategory(productCategoryRepository);

    it('should get a product category by id', async () => {
        const findByIdMock = productCategoryMock.mockProductCategoryFindById({ empty: false });

        const result = await getProductCategoryUseCase.execute('1', []);

        expect(result).toMatchObject({
            id: '1',
            name: 'Beverages',
        });
        expect(findByIdMock).toHaveBeenCalledWith('1', []);
    });

    it('should get a product category with includes', async () => {
        const findByIdMock = productCategoryMock.mockProductCategoryFindById({ empty: false });

        const result = await getProductCategoryUseCase.execute('1', ['products']);

        expect(result).toMatchObject({
            id: '1',
            name: 'Beverages',
        });
        expect(findByIdMock).toHaveBeenCalledWith('1', ['products']);
    });

    it('should throw NotFoundError if category does not exist', async () => {
        productCategoryMock.mockProductCategoryFindById({ empty: true });

        await expect(getProductCategoryUseCase.execute('999', [])).rejects.toThrow(NotFoundError);
    });
});
