import { OrderStatus, StatusPayment } from '@prisma/client';

import { Order } from '#/core/domain/entities/order.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderListDto, OrderListRequestDto } from '#/infrastructure/adapters/dto/order.dto';

export class ListOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    execute(request: OrderListRequestDto): Promise<Order[]> {
        const query: OrderListDto = {
            status: request.status ? (request.status.split(',') as OrderStatus[]) : undefined,
            clientId: request.clientId,
            productId: request.productId,
            paymentStatus: request.paymentStatus ? (request.paymentStatus.split(',') as StatusPayment[]) : undefined,
        };
        return this.orderRepository.list(query);
    }
}
