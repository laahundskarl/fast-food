import { inject, injectable } from 'inversify';

import { IDeleteOrderUseCase } from '#/application/use-cases/order/delete-order/delete-order.use-case';
import { NotFoundError } from '#/domain/errors';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class DeleteOrder implements IDeleteOrderUseCase {
    constructor(@inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository) {}

    async execute(id: string): Promise<any> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        return await this.orderRepository.destroy(id);
    }
}
