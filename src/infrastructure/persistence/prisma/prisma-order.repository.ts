import { PrismaClient } from '@prisma/client';

import { Order } from '#/core/domain/entities/order.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { OrderListDto } from '#/infrastructure/adapters/dto/order.dto';
import { PrismaOrderMapper } from '#/infrastructure/persistence/prisma/mapper/prisma-order.mapper';

export class PrismaOrderRepository implements OrderRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(order: Order): Promise<Order> {
        const data = await this.prisma.order.create({
            data: PrismaOrderMapper.toCreate(order),
            include: {
                client: true,
                orderProducts: {
                    include: {
                        product: true,
                    },
                },
                payments: true,
            },
        });
        return PrismaOrderMapper.toDomain(data);
    }

    async findById(id: string): Promise<Order | null> {
        const data = await this.prisma.order.findUnique({
            where: { id },
            include: {
                client: true,
                orderProducts: {
                    include: {
                        product: true,
                    },
                },
                payments: true,
            },
        });
        if (!data) return null;
        return PrismaOrderMapper.toDomain(data);
    }

    async list(query?: OrderListDto): Promise<Order[]> {
        const data = await this.prisma.order.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                ...(query?.status && { status: { in: query.status } }),
                ...(query?.productId && {
                    orderProducts: {
                        some: {
                            productId: query.productId,
                        },
                    },
                }),
                ...(query?.clientId && {
                    clientId: query.clientId,
                }),
                ...(query?.paymentStatus && {
                    payments: {
                        some: {
                            status: { in: query.paymentStatus },
                        },
                    },
                }),
            },
            include: {
                client: true,
                orderProducts: {
                    include: {
                        product: true,
                    },
                },
                payments: true,
            },
        });
        return data.map(item => PrismaOrderMapper.toDomain(item));
    }

    async updateOrderProducts(orderId: string, order: Order) {
        await this.prisma.orderProduct.deleteMany({
            where: { orderId },
        });

        const data = await this.prisma.order.update({
            where: { id: order.id },
            data: PrismaOrderMapper.toUpdateOrderProducts(order),
            include: {
                client: true,
                orderProducts: {
                    include: {
                        product: true,
                    },
                },
                payments: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });
        return PrismaOrderMapper.toDomain(data);
    }

    async updateStatus(id: string, order: Order): Promise<Order> {
        const data = await this.prisma.order.update({
            where: { id },
            data: {
                status: order.status,
            },
            include: {
                client: true,
                orderProducts: {
                    include: {
                        product: true,
                    },
                },
                payments: true,
            },
        });
        return PrismaOrderMapper.toDomain(data);
    }

    async destroy(id: string): Promise<void> {
        await this.prisma.order.delete({
            where: { id },
        });
    }
}
