import { OrderListDto } from '#/dto/order.dto';
import { Order } from '#/entities/order.entity';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    list(query?: OrderListDto): Promise<Order[]>;
    updateOrderProducts(id: string, order: Order): Promise<Order>;
    updateStatus(id: string, order: Order): Promise<Order>;
    destroy(id: string): Promise<void>;
}
