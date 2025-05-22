import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderListDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class TypeormOrderRepository implements OrderRepository {
    list(query?: OrderListDTO): any {
        return {
            teste: true,
            query,
        };
    }
}
