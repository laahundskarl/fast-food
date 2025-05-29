import { OrderCreateDTO, OrderListDTO, OrderUpdateDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export interface OrderRepository {
    list(query?: OrderListDTO): Promise<any>;
    get(id: string): Promise<any>;
    create(order: OrderCreateDTO): Promise<any>;
    update(id: string, order: OrderUpdateDTO): Promise<any>;
    destroy(id: string): Promise<void>;
}
