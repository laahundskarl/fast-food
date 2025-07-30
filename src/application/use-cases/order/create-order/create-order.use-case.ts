import { CreateOrderDto } from '#/application/use-cases/order/create-order/create-order.dto';
import { Order } from '#/domain/entities/order.entity';

export interface ICreateOrderUseCase {
    execute(request: CreateOrderDto): Promise<Order>;
}
