import { OrderStatus } from '@prisma/client';

import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { ListOrderRequestDto } from '#/application/use-cases/order/list-order/list-order.dto';
import { UpdateOrderDto } from '#/application/use-cases/order/update-order/update-order.dto';
import { OrderResponseDTO } from '#/interfaces/presenter/order/order-response.dto';

export interface IOrderController {
    create(request: CreateOrderDto): Promise<OrderResponseDTO>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<OrderResponseDTO>;
    list(query: ListOrderRequestDto): Promise<OrderResponseDTO[]>;
    update(id: string, request: UpdateOrderDto): Promise<OrderResponseDTO>;
    updateStatus(id: string, status: OrderStatus): Promise<OrderResponseDTO>;
}
