import { OrderStatus } from '@prisma/client';

import { OrderListDto } from '#/dto/order.dto';
import { Order } from '#/entities/order.entity';

export interface IOrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    list(query?: OrderListDto): Promise<Order[]>;
    updateOrderProducts(id: string, order: Order): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    destroy(id: string): Promise<void>;
}
