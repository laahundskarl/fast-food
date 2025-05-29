import { OrderUseCase } from '#/core/application/ports/order.use-case';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderCreateDTO, OrderListDTO, OrderUpdateDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class Order implements OrderUseCase {
    constructor(private readonly repository: OrderRepository) {}

    list(query: OrderListDTO): Promise<any> {
        return this.repository.list(query);
    }

    get(id: string): Promise<any> {
        return this.repository.get(id);
    }

    create(order: OrderCreateDTO): Promise<any> {
        return this.repository.create(order);
    }

    update(id: string, order: OrderUpdateDTO): Promise<any> {
        return this.repository.update(id, order);
    }

    destroy(id: string): Promise<any> {
        return this.repository.destroy(id);
    }
}
