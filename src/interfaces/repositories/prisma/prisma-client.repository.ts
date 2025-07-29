import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { Client } from '#/domain/entities/client.entity';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/types';
import { PrismaClientMapper } from '#/interfaces/repositories/prisma/mappers/prisma-client.mapper';

@injectable()
export class PrismaClientRepository implements IClientRepository {
    constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}

    async create(client: Client): Promise<Client> {
        const data = await this.prisma.client.create({
            data: PrismaClientMapper.toCreate(client),
        });
        return PrismaClientMapper.toDomainSimple(data);
    }

    async findByCpf(cpf: string): Promise<Client | null> {
        const data = await this.prisma.client.findFirst({
            where: { cpf },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomainSimple(data);
    }

    async findByEmail(email: string): Promise<Client | null> {
        const data = await this.prisma.client.findFirst({
            where: { email },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomainSimple(data);
    }

    async findByCpfOrEmail(cpf: string, email: string): Promise<Client | null> {
        const data = await this.prisma.client.findFirst({
            where: {
                OR: [{ cpf }, { email }],
            },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomainSimple(data);
    }

    async findOrders(cpf: string): Promise<Client | null> {
        const data = await this.prisma.client.findUnique({
            where: { cpf },
            include: { orders: { include: { payments: true, orderProducts: { include: { product: true } } } } },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async update(client: Client): Promise<Client> {
        const data = await this.prisma.client.update({
            where: { id: client.id },
            data: PrismaClientMapper.toUpdate(client),
        });
        return PrismaClientMapper.toDomainSimple(data);
    }

    async destroy(id: string): Promise<void> {
        await this.prisma.client.delete({
            where: { id },
        });
    }
}
