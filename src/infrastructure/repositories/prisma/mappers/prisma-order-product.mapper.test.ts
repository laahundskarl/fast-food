import { describe, expect, it } from 'vitest';

import { OrderProduct } from '#/domain/entities/order-product.entity';
import { PrismaOrderProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-order-product.mapper';

describe('PrismaOrderProductMapper', () => {
    const mockCategory = {
        id: 'category-123',
        name: 'Beverages',
    };

    const mockProduct = {
        id: 'product-123',
        name: 'Coca-Cola',
        value: 5.99,
        description: 'Refreshing soft drink',
        category: mockCategory,
    };

    const mockOrderProductData = {
        id: 'order-product-123',
        amount: 2,
        value: 11.98,
        product: mockProduct,
    };

    describe('toDomain', () => {
        it('should map prisma order product data to domain OrderProduct entity', () => {
            const orderProduct = PrismaOrderProductMapper.toDomain(mockOrderProductData);

            expect(orderProduct).toBeInstanceOf(OrderProduct);
            expect(orderProduct.id).toBe(mockOrderProductData.id);
            expect(orderProduct.amount).toBe(mockOrderProductData.amount);
            expect(orderProduct.value).toBe(mockOrderProductData.value);
            expect(orderProduct.product.id).toBe(mockProduct.id);
            expect(orderProduct.product.name).toBe(mockProduct.name);
        });
    });
});
