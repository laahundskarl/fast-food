import { Prisma } from '@prisma/client';

import { Order } from '#/domain/entities/order.entity';
import { PrismaClientMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-client.mapper';
import { PrismaOrderProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-order-product.mapper';
import { PrismaPaymentMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-payment.mapper';

export class PrismaOrderMapper {
    static toDomain(data: any): Order {
        return new Order({
            id: data.id,
            value: data.value,
            orderNumber: data.orderNumber,
            status: data.status,
            orderProducts:
                data.orderProducts?.map((orderProduct: any) => PrismaOrderProductMapper.toDomain(orderProduct)) || [],
            payments: data.payments?.map((payment: any) => PrismaPaymentMapper.toDomainSimple(payment)) || [],
            client: data.client ? PrismaClientMapper.toDomainSimple(data.client) : undefined,
        });
    }

    static toDomainSimple(data: any): Order {
        return new Order({
            id: data.id,
            value: data.value,
            orderNumber: data.orderNumber,
            status: data.status,
        });
    }

    static toCreate(data: Order): Prisma.OrderCreateInput {
        return {
            value: data.value,
            ...(data.client?.id && {
                client: {
                    connect: { id: data.client.id },
                },
            }),
            orderProducts: {
                create:
                    data.orderProducts?.map(item => ({
                        amount: item.amount,
                        value: item.value,
                        product: {
                            connect: { id: item.product.id },
                        },
                    })) || [],
            },
            payments: {
                create:
                    data.payments?.map(item => ({
                        status: item.status,
                        qrCode: item.qrCode,
                        externalReference: item.externalReference,
                    })) || [],
            },
        };
    }

    static toUpdateOrderProducts(data: Order): Prisma.OrderUpdateInput {
        return {
            value: data.value,
            status: data.status,
            ...(data.client?.id && {
                client: {
                    connect: {
                        id: data.client.id,
                    },
                },
            }),
            orderProducts: {
                deleteMany: {},
                create:
                    data.orderProducts?.map(item => ({
                        amount: item.amount,
                        value: item.value,
                        product: {
                            connect: { id: item.product.id },
                        },
                    })) || [],
            },
        };
    }
}
