import { describe, expect, it } from 'vitest';

import { DeleteProduct } from '#/application/use-cases/product/delete-product/delete-product';
import { NotFoundError } from '#/domain/errors';
import * as productMock from '#/infrastructure/repositories/prisma/mocks/prisma-product-mock.repository';
import { createLoggerMock } from '#/infrastructure/services/mocks/logger-mock.service';

describe('delete-product', () => {
    const loggerMock = createLoggerMock();
    const productRepository = new productMock.PrismaProductMockRepository();
    const deleteProductUseCase = new DeleteProduct(loggerMock, productRepository);

    it('should delete a product', async () => {
        productMock.mockProductFindById({ empty: false });
        const destroyMock = productMock.mockProductDestroy();

        await deleteProductUseCase.execute('1');

        expect(destroyMock).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError if product does not exist', async () => {
        productMock.mockProductFindById({ empty: true });

        await expect(deleteProductUseCase.execute('999')).rejects.toThrow(NotFoundError);
    });
});
