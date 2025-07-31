import { OrderListDto } from '#/application/dtos/order.dto';
import { Order } from '#/domain/entities/order.entity';

export interface IOrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    list(query?: OrderListDto): Promise<Order[]>;
    updateOrderProducts(id: string, order: Order): Promise<Order>;
    updateStatus(id: string, order: Order): Promise<Order>;
    destroy(id: string): Promise<void>;
}
