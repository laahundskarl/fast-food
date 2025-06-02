import { Prisma, StatusPayment } from '@prisma/client';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Order } from '#/core/domain/entities/order.entity';
import { Payment } from '#/core/domain/entities/payment.entity';
import { Product } from '#/core/domain/entities/product.entity';
import { OrderWithRelations } from '#/infrastructure/persistence/prisma/types/order.type';

export class PrismaOrderMapper {
    static toDomain(data: OrderWithRelations): Order {
        return new Order(
            data.value,
            data.status,
            data.orderNumber,
            data.clientId!,
            data.id,
            undefined,
            data.orderProducts.map(
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
                            undefined,
                            orderProduct.product.id,
                        ),
                    ),
            ),
            data.payments.map(
                payment => new Payment(payment.externalReference, payment.qrCode, payment.status, payment.id),
            ),
        );
    }

    static toCreate(data: Order): Prisma.OrderCreateInput {
        return {
            value: data.value,
            client: {
                connect: {
                    id: data.clientId,
                },
            },
            orderProducts: {
                create: data.orderProducts?.map(item => ({
                    amount: item.amount,
                    value: item.value,
                    product: {
                        connect: { id: item.productId },
                    },
                })),
            },
            payments: {
                create: {
                    status: StatusPayment.PENDING,
                    externalReference: 'mocked-external-reference',
                    qrCode: 'mocked-qr-code',
                },
            },
        };
    }

    static toUpdateOrderProducts(data: Order): Prisma.OrderUpdateInput {
        return {
            value: data.value,
            status: data.status,
            client: {
                connect: {
                    id: data.clientId,
                },
            },
            orderProducts: {
                deleteMany: {},
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
