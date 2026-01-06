import { ListOrderDto } from '#/application/use-cases/order/list-order/list-order.dto';
import { IOrder } from '#/domain/entities/order.entity';
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
