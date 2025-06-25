import { OrderStatus } from '@prisma/client';

import { OrderListDto } from '#/dto/order.dto';
import { CreateOrder, Order, UpdateOrder } from '#/entities/order.entity';

export interface IOrderRepository {
    create(order: CreateOrder): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    list(query?: OrderListDto): Promise<Order[]>;
    updateOrderProducts(id: string, order: UpdateOrder): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    destroy(id: string): Promise<void>;
}
