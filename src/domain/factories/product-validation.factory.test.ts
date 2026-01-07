import { describe, expect, it } from 'vitest';

import { NotFoundError } from '#/domain/errors';
import { ProductValidationFactory } from '#/domain/factories/product-validation.factory';

describe('product-validation-factory', () => {
    const mockCategory = {
        id: '1',
        name: 'Category 1',
    };

    const mockProduct1 = {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        value: 100,
        category: mockCategory,
    };

    const mockProduct2 = {
        id: '2',
        name: 'Product 2',
        description: 'Product 2 description',
        value: 200,
        category: mockCategory,
    };

    describe('validateProductsExist', () => {
        it('should not throw when all requested products exist', () => {
            const requestProducts = [
                { productId: '1', quantity: 1 },
                { productId: '2', quantity: 2 },
            ];
            const availableProducts = [mockProduct1, mockProduct2];

            expect(() => {
                ProductValidationFactory.validateProductsExist(requestProducts, availableProducts);
            }).not.toThrow();
        });

        it('should throw NotFoundError when some products are missing', () => {
            const requestProducts = [
                { productId: '1', quantity: 1 },
                { productId: '2', quantity: 2 },
            ];
            const availableProducts = [mockProduct1];

            expect(() => {
                ProductValidationFactory.validateProductsExist(requestProducts, availableProducts);
            }).toThrow(NotFoundError);
        });

        it('should throw NotFoundError with correct message when products are missing', () => {
            const requestProducts = [{ productId: '1', quantity: 1 }];
            const availableProducts: typeof mockProduct1[] = [];

            expect(() => {
                ProductValidationFactory.validateProductsExist(requestProducts, availableProducts);
            }).toThrow('One or more products not found');
        });
    });

    describe('validateQuantities', () => {
        it('should not throw when all quantities are greater than 0', () => {
            const requestedProducts = [{ quantity: 1 }, { quantity: 5 }, { quantity: 10 }];

            expect(() => {
                ProductValidationFactory.validateQuantities(requestedProducts);
            }).not.toThrow();
        });

        it('should throw error when quantity is 0', () => {
            const requestedProducts = [{ quantity: 1 }, { quantity: 0 }];

            expect(() => {
                ProductValidationFactory.validateQuantities(requestedProducts);
            }).toThrow('Product quantity must be greater than 0');
        });

        it('should throw error when quantity is negative', () => {
            const requestedProducts = [{ quantity: 1 }, { quantity: -1 }];

            expect(() => {
                ProductValidationFactory.validateQuantities(requestedProducts);
            }).toThrow('Product quantity must be greater than 0');
        });
    });

    describe('findProductById', () => {
        it('should return product when found', () => {
            const products = [mockProduct1, mockProduct2];

            const result = ProductValidationFactory.findProductById('1', products);

            expect(result).toMatchObject({
                id: '1',
                name: 'Product 1',
                value: 100,
            });
        });

        it('should return correct product from multiple products', () => {
            const products = [mockProduct1, mockProduct2];

            const result = ProductValidationFactory.findProductById('2', products);

            expect(result).toMatchObject({
                id: '2',
                name: 'Product 2',
                value: 200,
            });
        });

        it('should throw NotFoundError when product is not found', () => {
            const products = [mockProduct1];

            expect(() => {
                ProductValidationFactory.findProductById('999', products);
            }).toThrow(NotFoundError);
        });

        it('should throw NotFoundError with correct message including product id', () => {
            const products: typeof mockProduct1[] = [];

            expect(() => {
                ProductValidationFactory.findProductById('abc-123', products);
            }).toThrow('Product with id abc-123 not found');
        });
    });
});
