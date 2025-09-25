import { ListOrderDto } from '#/application/use-cases/order/list-order/list-order.dto';
import { IOrder } from '#/domain/entities/order.entity';

export interface IOrderRepository {
    create(order: IOrder): Promise<IOrder>;
    findById(id: string): Promise<IOrder | null>;
    list(query?: ListOrderDto): Promise<IOrder[]>;
    updateOrderProducts(id: string, order: IOrder): Promise<IOrder>;
    updateStatus(id: string, order: IOrder): Promise<IOrder>;
    destroy(id: string): Promise<void>;
}
