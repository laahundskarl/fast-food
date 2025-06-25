import { OrderStatus, PrismaClient } from '@prisma/client';

import { OrderListDto } from '#/dto/order.dto';
import { CreateOrder, Order } from '#/entities/order.entity';
import { PrismaOrderMapper } from '#/mappers/prisma/prisma-order.mapper';
import { IOrderRepository } from '#/repositories/order.repository';

export class PrismaOrderRepository implements IOrderRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(order: CreateOrder): Promise<Order> {
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
                payments: true,
            },
        });
        return PrismaOrderMapper.toDomain(data);
    }

    async updateStatus(id: string, status: OrderStatus): Promise<Order> {
        const data = await this.prisma.order.update({
            where: { id },
            data: {
                status,
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
