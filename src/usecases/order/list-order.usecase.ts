import { OrderStatus, StatusPayment } from '@prisma/client';

import { OrderListDto, OrderListRequestDto } from '#/dto/order.dto';
import { Order } from '#/entities/order.entity';
import { OrderRepository } from '#/repositories/order.repository';

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
