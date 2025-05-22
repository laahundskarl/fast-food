import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export interface OrderUseCase {
    list(query?: OrderListDTO): Promise<any>;
}
