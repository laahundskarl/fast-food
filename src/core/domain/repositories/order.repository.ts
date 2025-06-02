import { Order } from '#/core/domain/entities/order.entity';
import { OrderListDto } from '#/infrastructure/adapters/dto/order.dto';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    list(query?: OrderListDto): Promise<Order[]>;
    update(id: string, order: Order): Promise<Order>;
    destroy(id: string): Promise<void>;
}
