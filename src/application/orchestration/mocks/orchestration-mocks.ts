import { StatusPayment } from '@prisma/client';
import { vi } from 'vitest';

import { IClientOrchestration } from '#/application/orchestration/interfaces/i-client.orchestration';
import { IPaymentOrchestration } from '#/application/orchestration/interfaces/i-payment.orchestration';
import { IProductOrchestration } from '#/application/orchestration/interfaces/i-product.orchestration';
import { Client, IClient } from '#/domain/entities/client.entity';
import { Order } from '#/domain/entities/order.entity';
import { IPayment, Payment } from '#/domain/entities/payment.entity';
import { ProductCategory } from '#/domain/entities/product-category.entity';
import { IProduct, Product } from '#/domain/entities/product.entity';

export class ProductOrchestrationMock implements IProductOrchestration {
    async validateAndGetProducts(_orderProducts: { productId: string; quantity: number }[]): Promise<IProduct[]> {
        return Promise.resolve([]);
    }
}

export class ClientOrchestrationMock implements IClientOrchestration {
    async getClientIfExists(_clientId: string): Promise<IClient | undefined> {
        return Promise.resolve(undefined);
    }
}

export class PaymentOrchestrationMock implements IPaymentOrchestration {
    async createPaymentForOrder(_order: Order): Promise<IPayment> {
        return Promise.resolve(
            new Payment({
                id: '1',
                status: StatusPayment.PENDING,
            }),
        );
    }
}

const categoryMock = new ProductCategory({
    id: '1',
    name: 'Beverages',
});

const productMock = new Product({
    id: '1',
    name: 'Coca-Cola',
    value: 5.99,
    description: 'Refreshing beverage',
    category: categoryMock,
});

const clientMock = new Client({
    id: '1',
    name: 'John Doe',
    cpf: '12345678900',
    email: 'john.doe@example.com',
});

const paymentMock = new Payment({
    id: '1',
    status: StatusPayment.PENDING,
    externalReference: 'ext-ref-123',
    qrCode: 'qr-code-data',
});

type ProductMockOptions = {
    data?: IProduct[];
};

type ClientMockOptions = {
    data?: IClient;
    empty?: boolean;
};

type PaymentMockOptions = {
    data?: IPayment;
};

export function mockValidateAndGetProducts({ data = [productMock] }: ProductMockOptions = {}) {
    return vi.spyOn(ProductOrchestrationMock.prototype, 'validateAndGetProducts').mockResolvedValueOnce(data);
}

export function mockGetClientIfExists({ data = clientMock, empty }: ClientMockOptions = {}) {
    return vi
        .spyOn(ClientOrchestrationMock.prototype, 'getClientIfExists')
        .mockResolvedValueOnce(empty ? undefined : data);
}

export function mockCreatePaymentForOrder({ data = paymentMock }: PaymentMockOptions = {}) {
    return vi.spyOn(PaymentOrchestrationMock.prototype, 'createPaymentForOrder').mockResolvedValueOnce(data);
}
