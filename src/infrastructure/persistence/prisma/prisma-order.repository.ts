import { PrismaClient } from '@prisma/client';

import { Order } from '#/core/domain/entities/order.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
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

    async update(id: string, order: Order): Promise<Order> {
        const data = await this.prisma.order.update({
            where: { id },
            data: PrismaOrderMapper.toUpdate(order),
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
        const order = await this.prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        await this.prisma.order.delete({
            where: { id },
        });
    }
}
