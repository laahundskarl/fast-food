import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';

import { Order, OrderStatus } from '#/core/domain/entities/order.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { AppDataSource } from '#/database/typeorm.config';
import { OrderCreateDTO, OrderListDTO, OrderUpdateDTO } from '#/infrastructure/adapters/dto/order-list.dto';

export class TypeormOrderRepository implements OrderRepository {
    private dataSource: DataSource;
    private orderRepository: Repository<Order>;

    public constructor() {
        this.dataSource = AppDataSource;
        this.orderRepository = this.dataSource.getRepository(Order);
    }

    list(query?: OrderListDTO): Promise<any> {
        return this.orderRepository.find({
            order: {
                createdAt: 'DESC',
            },
            where: {
                ...(query?.status && { status: query.status as OrderStatus }),
                ...(query?.productId && { orderProducts: { product: { id: query.productId } } }),
                ...(query?.clientId && { client: { id: query.clientId } }),
            },
            relations: {
                client: true,
                orderProducts: {
                    product: true,
                },
                payments: true,
            },
        });
    }

    get(id: string): Promise<any> {
        return this.orderRepository.findOne({
            where: [{ id }, { publicId: Number(id) }],
            relations: {
                client: true,
                orderProducts: true,
            },
        });
    }

    create(order: OrderCreateDTO): Promise<any> {
        return this.orderRepository.save({
            clientId: order.clientId,
            value: order.value,
            orderNumber: order.orderNumber,
            orderProducts: order.orderProducts.map(op => ({
                product_id: op.productId,
                amount: op.amount,
                value: op.value,
            })),
        });
    }

    async update(id: string, order: OrderUpdateDTO): Promise<any> {
        await this.orderRepository.update(id, {
            ...(order.clientId && { clientId: order.clientId }),
            ...(order.status && { status: order.status as OrderStatus }),
            ...(order.value && { value: order.value }),
            ...(order.orderNumber && { orderNumber: order.orderNumber }),
            ...(order.orderProducts && { orderProducts: order.orderProducts }),
        });

        return this.orderRepository.findOne({
            where: { id },
            relations: {
                client: true,
                orderProducts: true,
            },
        });
    }

    async destroy(id: string): Promise<void> {
        await this.orderRepository.delete(id);
    }
}
