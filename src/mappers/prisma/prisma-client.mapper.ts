import { Prisma } from '@prisma/client';

import { Client } from '#/entities/client.entity';
import { OrderProduct } from '#/entities/order-product.entity';
import { Order } from '#/entities/order.entity';
import { Payment } from '#/entities/payment.entity';
import { Product } from '#/entities/product.entity';
import { ClientWithRelations } from '#/types/client.type';

export class PrismaClientMapper {
    static toDomain(data: ClientWithRelations): Client {
        return new Client({
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            id: data.id,
            orders: data.orders?.map(
                item =>
                    new Order({
                        value: item.value,
                        status: item.status,
                        orderNumber: item.orderNumber,
                        clientId: item.id,
                        orderProducts: item.orderProducts.map(
                            orderProduct =>
                                new OrderProduct({
                                    amount: orderProduct.amount,
                                    value: orderProduct.value,
                                    id: orderProduct.id,
                                    products: new Product({
                                        name: orderProduct.product.name,
                                        value: orderProduct.product.value,
                                        description: orderProduct.product.description,
                                        id: orderProduct.product.id,
                                    }),
                                }),
                        ),
                        payments: item.payments.map(
                            payment =>
                                new Payment({
                                    externalReference: payment.externalReference,
                                    qrCode: payment.qrCode,
                                    status: payment.status,
                                    id: payment.id,
                                }),
                        ),
                    }),
            ),
        });
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
