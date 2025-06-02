import { Order } from '#/core/domain/entities/order.entity';
import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    list(query?: OrderListDTO): Promise<Order[]>;
    update(id: string, order: Order): Promise<Order>;
    destroy(id: string): Promise<void>;
}
