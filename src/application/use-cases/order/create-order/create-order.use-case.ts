import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { IOrder } from '#/domain/entities/order.entity';

export interface ICreateOrderUseCase {
    execute(request: CreateOrderDto): Promise<IOrder>;
}
