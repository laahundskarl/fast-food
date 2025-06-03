import { PrismaClient } from '@prisma/client';

import { Client } from '#/core/domain/entities/client.entity';
import { ClientRepository } from '#/core/domain/repositories/client.repository';
import { PrismaClientMapper } from '#/infrastructure/persistence/prisma/mapper/prisma-client.mapper';

export class PrismaClientRepository implements ClientRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(client: Client): Promise<Client> {
        const data = await this.prisma.client.create({
            data: PrismaClientMapper.toCreate(client),
        });
        return PrismaClientMapper.toDomain(data);
    }

    async findByCpf(cpf: string): Promise<Client | null> {
        const data = await this.prisma.client.findFirst({
            where: { cpf },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async findWithOrders(cpf: string): Promise<Client | null> {
        const data = await this.prisma.client.findUnique({
            where: { cpf },
            include: { orders: { include: { payments: true, orderProducts: { include: { product: true } } } } },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async update(id: string, client: Client): Promise<Client> {
        const data = await this.prisma.client.update({
            where: { id },
            data: PrismaClientMapper.toUpdate(client),
        });
        return PrismaClientMapper.toDomain(data);
    }

    async destroy(id: string): Promise<void> {
        await this.prisma.client.delete({
            where: { id },
        });
    }
}
