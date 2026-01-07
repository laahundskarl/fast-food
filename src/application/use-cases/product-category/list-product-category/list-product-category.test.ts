import { describe, expect, it } from 'vitest';

import { ListProductCategory } from '#/application/use-cases/product-category/list-product-category/list-product-category';
import * as productCategoryMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-category-mock.repository';
import { createLoggerMock } from '#/infrastructure/services/mocks/logger-mock.service';

describe('list-product-category', () => {
    const loggerMock = createLoggerMock();
    const productCategoryRepository = new productCategoryMock.PrismaProductCategoryMockRepository();
    const listProductCategoryUseCase = new ListProductCategory(loggerMock, productCategoryRepository);

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

    it('should return empty array when no categories exist', async () => {
        productCategoryMock.mockProductCategoryList({ data: [] });

        const result = await listProductCategoryUseCase.execute();

        expect(result).toHaveLength(0);
    });
});
