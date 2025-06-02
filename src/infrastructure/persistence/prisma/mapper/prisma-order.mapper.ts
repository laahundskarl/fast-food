import { Prisma } from '@prisma/client';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Order } from '#/core/domain/entities/order.entity';
import { Payment } from '#/core/domain/entities/payment.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { OrderWithRelations } from '#/infrastructure/persistence/prisma/types/order.type';

export class PrismaOrderMapper {
    static toDomain(data: OrderWithRelations): Order {
        return new Order(
            data.value,
            data.orderNumber,
            data.status,
            data.id,
            undefined,
            data.orderProducts.map(
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
            data.payments.map(
                payment => new Payment(payment.status, payment.externalReference, payment.qrCode, payment.id),
            ),
        );
    }

    static toCreate(data: Order): Prisma.OrderCreateInput {
        return {
            value: data.value,
            orderNumber: undefined,
            status: data.status,
            client: {
                connect: {
                    id: data.client?.id,
                },
            },
            orderProducts: {
                create: data.orderProducts?.map(item => ({
                    amount: item.amount,
                    value: item.value,
                    product: {
                        connect: { id: item.products?.id },
                    },
                })),
            },
            payments: {
                create: data.payments?.map(item => ({
                    status: item.status,
                    externalReference: item.externalReference,
                    qrCode: item.qrCode,
                })),
            },
        };
    }

    static toUpdate(data: Order): Prisma.OrderUpdateInput {
        return {
            value: data.value,
            status: data.status,
            client: {
                connect: {
                    id: data.client?.id,
                },
            },
            orderProducts: {
                create: data.orderProducts?.map(item => ({
                    amount: item.amount,
                    value: item.value,
                    product: {
                        connect: { id: item.products?.id },
                    },
                })),
            },
            payments: {
                create: data.payments?.map(item => ({
                    status: item.status,
                    externalReference: item.externalReference,
                    qrCode: item.qrCode,
                })),
            },
        };
    }
}
