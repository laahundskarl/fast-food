import { OrderStatus } from '@prisma/client';
import { vi } from 'vitest';

import { ListOrderDto } from '#/application/use-cases/order/list-order/list-order.dto';
import { IOrder, Order } from '#/domain/entities/order.entity';
import { IOrderRepository } from '#/domain/repositories/order.repository';

export class PrismaOrderMockRepository implements IOrderRepository {
    async create(order: IOrder): Promise<IOrder> {
        return Promise.resolve(order);
    }

    async findById(_id: string): Promise<IOrder | null> {
        return Promise.resolve(null);
    }

    async list(_query?: ListOrderDto): Promise<IOrder[]> {
        return Promise.resolve([]);
    }

    async updateOrderProducts(_id: string, order: IOrder): Promise<IOrder> {
        return Promise.resolve(order);
    }

    async updateStatus(_id: string, order: IOrder): Promise<IOrder> {
        return Promise.resolve(order);
    }

    async destroy(_id: string): Promise<void> {
        return Promise.resolve();
    }
}

const orderMock = new Order({
    id: '1',
    value: 25.99,
    orderNumber: 1001,
    status: OrderStatus.WAITING,
    orderProducts: [],
    payments: [],
});

type MockOptions = {
    data?: IOrder;
    empty?: boolean;
};

type MockListOptions = {
    data?: IOrder[];
};

export function mockOrderCreate({ data = orderMock }: MockOptions = {}) {
    return vi.spyOn(PrismaOrderMockRepository.prototype, 'create').mockResolvedValueOnce(data);
}

export function mockOrderFindById({ data = orderMock, empty }: MockOptions = {}) {
    return vi.spyOn(PrismaOrderMockRepository.prototype, 'findById').mockResolvedValueOnce(empty ? null : data);
}

export function mockOrderList({ data = [orderMock] }: MockListOptions = {}) {
    return vi.spyOn(PrismaOrderMockRepository.prototype, 'list').mockResolvedValueOnce(data);
}

export function mockOrderUpdateOrderProducts({ data = orderMock }: MockOptions = {}) {
    return vi.spyOn(PrismaOrderMockRepository.prototype, 'updateOrderProducts').mockResolvedValueOnce(data);
}

export function mockOrderUpdateStatus({ data = orderMock }: MockOptions = {}) {
    return vi.spyOn(PrismaOrderMockRepository.prototype, 'updateStatus').mockResolvedValueOnce(data);
}

export function mockOrderDestroy() {
    return vi.spyOn(PrismaOrderMockRepository.prototype, 'destroy').mockResolvedValueOnce();
}
