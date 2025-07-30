import { PrismaClient } from '@prisma/client';
import { injectable, inject } from 'inversify';

import { OrderListDto } from '#/application/dtos/order.dto';
import { Order } from '#/domain/entities/order.entity';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { TYPES } from '#/infrastructure/config/types';
import { PrismaOrderMapper } from '#/interfaces/repositories/prisma/mappers/prisma-order.mapper';

@injectable()
export class PrismaOrderRepository implements IOrderRepository {
    constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}

    async create(order: Order): Promise<Order> {
        const data = await this.prisma.order.create({
            data: PrismaOrderMapper.toCreate(order),
            include: this.getIncludeOptions(),
        });

        return PrismaOrderMapper.toDomain(data);
    }

    async findById(id: string): Promise<Order | null> {
        const data = await this.prisma.order.findUnique({
            where: { id },
            include: this.getIncludeOptions(),
        });

        if (!data) return null;
        return PrismaOrderMapper.toDomain(data);
    }

    async list(query?: OrderListDto): Promise<Order[]> {
        const data = await this.prisma.order.findMany({
            where: this.buildWhereClause(query),
            orderBy: { createdAt: 'desc' },
            include: this.getIncludeOptions(),
        });

        return data.map(item => PrismaOrderMapper.toDomain(item));
    }

    async updateOrderProducts(orderId: string, order: Order): Promise<Order> {
        const data = await this.prisma.$transaction(async tx => {
            await tx.orderProduct.deleteMany({
                where: { orderId },
            });

            return await tx.order.update({
                where: { id: orderId },
                data: PrismaOrderMapper.toUpdateOrderProducts(order),
                include: this.getIncludeOptions(),
            });
        });

        return PrismaOrderMapper.toDomain(data);
    }

    async updateStatus(id: string, order: Order): Promise<Order> {
        const data = await this.prisma.order.update({
            where: { id },
            data: { status: order.status },
            include: this.getIncludeOptions(),
        });

        return PrismaOrderMapper.toDomain(data);
    }

    async destroy(id: string): Promise<void> {
        await this.prisma.order.delete({
            where: { id },
        });
    }

    private getIncludeOptions() {
        return {
            client: true,
            orderProducts: {
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
            payments: true,
        };
    }

    private buildWhereClause(query?: OrderListDto) {
        if (!query) return {};

        return {
            ...(query.status && { status: { in: query.status } }),
            ...(query.productId && {
                orderProducts: {
                    some: {
                        productId: query.productId,
                    },
                },
            }),
            ...(query.clientId && { clientId: query.clientId }),
            ...(query.paymentStatus && {
                payments: {
                    some: {
                        status: { in: query.paymentStatus },
                    },
                },
            }),
        };
    }
}
