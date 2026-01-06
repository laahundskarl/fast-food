import { describe, expect, it } from 'vitest';

import { ListProduct } from '#/application/use-cases/product/list-product/list-product';
import * as productMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-mock.repository';

describe('list-product', () => {
    const productRepository = new productMock.PrismaProductMockRepository();
    const listProductUseCase = new ListProduct(productRepository);

    it('should list products', async () => {
        const listMock = productMock.mockProductList({});

        const result = await listProductUseCase.execute();

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            name: 'Coca-Cola',
            value: 5.99,
            description: 'Refreshing beverage',
        });
        expect(listMock).toHaveBeenCalled();
    });

    it('should list products with query filter', async () => {
        const listMock = productMock.mockProductList({});

        const result = await listProductUseCase.execute({ categoryId: '1' });

        expect(result).toHaveLength(1);
        expect(listMock).toHaveBeenCalledWith({ categoryId: '1' });
    });

    it('should return empty array when no products exist', async () => {
        productMock.mockProductList({ data: [] });

        const result = await listProductUseCase.execute();

        expect(result).toHaveLength(0);
    });
});
