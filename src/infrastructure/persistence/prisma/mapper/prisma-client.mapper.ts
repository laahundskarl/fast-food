import { Prisma } from '@prisma/client';

import { Client } from '#/core/domain/entities/client.entity';
import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Order } from '#/core/domain/entities/order.entity';
import { Payment } from '#/core/domain/entities/payment.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { ClientWithRelations } from '#/infrastructure/persistence/prisma/types/client.type';

export class PrismaClientMapper {
    static toDomain(data: ClientWithRelations): Client {
        return new Client(
            data.id,
            data.name,
            data.cpf,
            data.email,
            data.orders?.map(
                item =>
                    new Order(
                        item.value,
                        item.orderNumber,
                        item.status,
                        item.id,
                        undefined,
                        item.orderProducts.map(
                            orderProduct =>
                                new OrderProduct(
                                    orderProduct.amount,
                                    orderProduct.value,
                                    orderProduct.id,
                                    new Product(
                                        orderProduct.product.name,
                                        orderProduct.product.value,
                                        orderProduct.product.description,
                                        orderProduct.product.id,
                                    ),
                                ),
                        ),
                        item.payments.map(
                            payment =>
                                new Payment(payment.status, payment.externalReference, payment.qrCode, payment.id),
                        ),
                    ),
            ),
        );
    }

    static toCreate(data: Client): Prisma.ClientCreateInput {
        return {
            name: data.name,
            cpf: data.cpf,
            email: data.email,
        };
    }

    static toUpdate(data: Client): Prisma.ClientUpdateInput {
        return {
            name: data.name,
            cpf: data.cpf,
            email: data.email,
        };
    }
}
