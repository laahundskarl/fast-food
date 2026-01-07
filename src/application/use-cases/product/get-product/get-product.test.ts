import { describe, expect, it } from 'vitest';

import { GetProduct } from '#/application/use-cases/product/get-product/get-product';
import { NotFoundError } from '#/domain/errors';
import * as productMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-mock.repository';

describe('get-product', () => {
    const productRepository = new productMock.PrismaProductMockRepository();
    const getProductUseCase = new GetProduct(productRepository);

    it('should get a product by id', async () => {
        const findByIdMock = productMock.mockProductFindById({ empty: false });

        const result = await getProductUseCase.execute('1');

        expect(result).toMatchObject({
            name: 'Coca-Cola',
            value: 5.99,
            description: 'Refreshing beverage',
        });
        expect(findByIdMock).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError if product does not exist', async () => {
        productMock.mockProductFindById({ empty: true });

        await expect(getProductUseCase.execute('999')).rejects.toThrow(NotFoundError);
    });
});
