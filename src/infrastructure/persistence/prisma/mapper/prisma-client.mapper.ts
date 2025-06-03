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
            data.name,
            data.cpf,
            data.email,
            data.id,
            data.orders?.map(
                item =>
                    new Order(
                        item.value,
                        item.status,
                        item.orderNumber,
                        item.id,
                        undefined,
                        undefined,
                        item.orderProducts.map(
                            orderProduct =>
                                new OrderProduct(
                                    orderProduct.amount,
                                    orderProduct.value,
                                    undefined,
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
                                new Payment(payment.externalReference, payment.qrCode, payment.status, payment.id),
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
