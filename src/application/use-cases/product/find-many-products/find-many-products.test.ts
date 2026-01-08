import { describe, expect, it } from 'vitest';

import { FindManyProducts } from '#/application/use-cases/product/find-many-products/find-many-products';
import * as productMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-mock.repository';
import { createLoggerMock } from '#/infrastructure/services/mocks/logger-mock.service';

describe('get-product', () => {
    const loggerMock = createLoggerMock();
    const productRepository = new productMock.PrismaProductMockRepository();
    const findManyProductsUseCase = new FindManyProducts(loggerMock, productRepository);

    it('should find multiple products by ids', async () => {
        const findManyMock = productMock.mockProductFindMany({});

        const result = await findManyProductsUseCase.execute(['1', '2']);

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            name: 'Coca-Cola',
            value: 5.99,
            description: 'Refreshing beverage',
        });
        expect(findManyMock).toHaveBeenCalled();
    });

    it('should return empty array when no products exist', async () => {
        productMock.mockProductList({ data: [] });

        const result = await findManyProductsUseCase.execute([]);

        expect(result).toHaveLength(0);
    });
});
