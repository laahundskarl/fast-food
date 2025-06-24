import { NotFoundError } from '#/errors/app-error';
import { IOrderRepository } from '#/repositories/order.repository';

export class DeleteOrderUseCase {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(id: string): Promise<any> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        return await this.orderRepository.destroy(id);
    }
}
