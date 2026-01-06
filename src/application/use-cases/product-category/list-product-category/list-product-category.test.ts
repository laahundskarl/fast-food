import { describe, expect, it } from 'vitest';

import { ListProductCategory } from '#/application/use-cases/product-category/list-product-category/list-product-category';
import * as productCategoryMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-category-mock.repository';

describe('list-product-category', () => {
    const productCategoryRepository = new productCategoryMock.PrismaProductCategoryMockRepository();
    const listProductCategoryUseCase = new ListProductCategory(productCategoryRepository);

    it('should list product categories', async () => {
        const listMock = productCategoryMock.mockProductCategoryList({});

        const result = await listProductCategoryUseCase.execute();

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            id: '1',
            name: 'Beverages',
        });
        expect(listMock).toHaveBeenCalled();
    });

    it('should list product categories with query filter', async () => {
        const listMock = productCategoryMock.mockProductCategoryList({});

        const result = await listProductCategoryUseCase.execute({ includes: ['products'] });

        expect(result).toHaveLength(1);
        expect(listMock).toHaveBeenCalledWith({ includes: ['products'] });
    });

    it('should return empty array when no categories exist', async () => {
        productCategoryMock.mockProductCategoryList({ data: [] });

        const result = await listProductCategoryUseCase.execute();

        expect(result).toHaveLength(0);
    });
});
