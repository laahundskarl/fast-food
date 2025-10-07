import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { IClient } from '#/domain/entities/client.entity';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { TYPES } from '#/infrastructure/config/di/types';
import { PrismaClientMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-client.mapper';

@injectable()
export class PrismaClientRepository implements IClientRepository {
    constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}

    async create(client: IClient): Promise<IClient> {
        const data = await this.prisma.client.create({
            data: PrismaClientMapper.toCreate(client),
        });
        return PrismaClientMapper.toDomain(data);
    }

    async findByCpf(cpf: string, includes: string[]): Promise<IClient | null> {
        const data = await this.prisma.client.findFirst({
            where: { cpf },
            include: {
                orders: includes.includes('orders')
                    ? {
                          include: {
                              payments: includes.includes('payments'),
                              orderProducts: includes.includes('products') ? { include: { product: true } } : false,
                          },
                      }
                    : false,
            },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async findByEmail(email: string): Promise<IClient | null> {
        const data = await this.prisma.client.findFirst({
            where: { email },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async findByCpfOrEmail(cpf: string, email: string): Promise<IClient | null> {
        const data = await this.prisma.client.findFirst({
            where: {
                OR: [{ cpf }, { email }],
            },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async findById(id: string): Promise<IClient | null> {
        const data = await this.prisma.client.findUnique({
            where: { id },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async update(client: IClient): Promise<IClient> {
        const data = await this.prisma.client.update({
            where: { id: client.id },
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
