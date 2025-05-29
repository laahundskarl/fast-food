import { OrderRepository } from '#/core/domain/repositories/order.repository';

export class DeleteOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(id: string): Promise<any> {
        return await this.orderRepository.destroy(id);
    }
}
