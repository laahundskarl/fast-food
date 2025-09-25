import { UpdateOrderDto } from '#/application/use-cases/order/update-order/update-order.dto';
import { IOrder } from '#/domain/entities/order.entity';

export interface IUpdateOrderUseCase {
    execute(id: string, request: UpdateOrderDto): Promise<IOrder>;
}
