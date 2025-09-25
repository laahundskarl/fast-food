import { OrderStatus } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { IUpdateOrderStatusUseCase } from '#/application/use-cases/order/update-order-status/update-order-status.use-case';
import { IOrder } from '#/domain/entities/order.entity';
import { NotFoundError } from '#/domain/errors';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class UpdateOrderStatus implements IUpdateOrderStatusUseCase {
    constructor(@inject(TYPES.OrderRepository) private orderRepository: IOrderRepository) {}

    async execute(id: string, newStatus: OrderStatus): Promise<IOrder> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }

        order.updateStatus(newStatus);

        const update = await this.orderRepository.updateStatus(id, order);

        return update;
    }
}
