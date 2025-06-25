import { OrderStatus, Prisma, Order as PrismaOrder } from '@prisma/client';

import { OrderProduct } from '#/entities/order-product.entity';
import { CreateOrder, Order } from '#/entities/order.entity';
import { Payment } from '#/entities/payment.entity';
import { Product } from '#/entities/product.entity';
import { OrderWithRelations } from '#/types/order.type';

export class PrismaOrderMapper {
    static toDomain(data: OrderWithRelations): Order {
        return new Order({
            value: data.value,
            status: data.status,
            orderNumber: data.orderNumber,
            clientId: data.clientId!,
            id: data.id,
            orderProducts: data.orderProducts.map(
                orderProduct =>
                    new OrderProduct({
                        amount: orderProduct.amount,
                        value: orderProduct.value.toNumber(),
                        id: orderProduct.id,
                        productId: orderProduct.productId,
                        product: new Product({
                            name: orderProduct.product.name,
                            value: orderProduct.product.value,
                            description: orderProduct.product.description,
                            id: orderProduct.product.id,
                        }),
                    }),
            ),
            payments: data.payments.map(
                payment =>
                    new Payment({
                        externalReference: payment.externalReference,
                        qrCode: payment.qrCode,
                        status: payment.status,
                        id: payment.id,
                    }),
            ),
        });
    }

    static toDomainWithoutRelations(data: PrismaOrder): Order {
        return new Order({
            value: data.value,
            status: data.status,
            payments: [],
            orderProducts: [],
            orderNumber: data.orderNumber,
            clientId: data.clientId!,
            id: data.id,
        });
    }

    static toCreate(data: CreateOrder): Prisma.OrderCreateInput {
        return {
            value: data.total,
            client: {
                connect: { id: data.clientId! },
            },
            status: OrderStatus.WAITING,
        };
    }

    static toUpdateOrderProducts(data: Order): Prisma.OrderUpdateInput {
        return {
            value: data.value,
            status: data.status,
            ...(data.clientId && {
                client: {
                    connect: {
                        id: data.clientId,
                    },
                },
            }),
            orderProducts: {
                deleteMany: {},
                create: data.orderProducts?.map(item => ({
                    amount: item.amount,
                    value: item.value,
                    product: {
                        connect: { id: item.product?.id },
                    },
                })),
            },
        };
    }
}
