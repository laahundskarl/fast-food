import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export interface OrderRepository {
    list(query?: OrderListDTO): Promise<any>;
}
