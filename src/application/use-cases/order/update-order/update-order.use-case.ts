import { UpdateOrderDto } from '#/application/use-cases/order/update-order/update-order.dto';
import { Order } from '#/domain/entities/order.entity';

export interface IUpdateOrderUseCase {
    execute(id: string, request: UpdateOrderDto): Promise<Order>;
}
