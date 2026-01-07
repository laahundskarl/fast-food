import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { Client } from '#/domain/entities/client.entity';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { ILogger } from '#/domain/services/logger.service';
import { TYPES } from '#/infrastructure/config/di/types';
import { PrismaClientMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-client.mapper';

@injectable()
export class PrismaClientRepository implements IClientRepository {
    constructor(
        @inject(TYPES.Logger) private readonly logger: ILogger,
        @inject(TYPES.PrismaClient) private readonly prisma: PrismaClient,
    ) {}

    async create(client: Client): Promise<Client> {
        try {
            this.logger.debug('Creating client in database', { cpf: client.cpf });
            const data = await this.prisma.client.create({
                data: PrismaClientMapper.toCreate(client),
            });
            const result = PrismaClientMapper.toDomain(data);
            this.logger.debug('Client created in database', { clientId: result.id });
            return result;
        } catch (error) {
            this.logger.error('Failed to create client in database', error as Error, { cpf: client.cpf });
            throw error;
        }
    }

    async findByCpf(cpf: string): Promise<Client | null> {
        this.logger.debug('Finding client by CPF', { cpf });
        const data = await this.prisma.client.findFirst({
            where: { cpf },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async findByEmail(email: string): Promise<Client | null> {
        this.logger.debug('Finding client by email', { email });
        const data = await this.prisma.client.findFirst({
            where: { email },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async findByCpfOrEmail(cpf: string, email: string): Promise<Client | null> {
        this.logger.debug('Finding client by CPF or email', { cpf, email });
        const data = await this.prisma.client.findFirst({
            where: {
                OR: [{ cpf }, { email }],
            },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async findById(id: string): Promise<Client | null> {
        this.logger.debug('Finding client by ID', { clientId: id });
        const data = await this.prisma.client.findUnique({
            where: { id },
        });
        if (!data) return null;
        return PrismaClientMapper.toDomain(data);
    }

    async update(client: Client): Promise<Client> {
        try {
            this.logger.debug('Updating client in database', { clientId: client.id });
            const data = await this.prisma.client.update({
                where: { id: client.id },
                data: PrismaClientMapper.toUpdate(client),
            });
            const result = PrismaClientMapper.toDomain(data);
            this.logger.debug('Client updated in database', { clientId: result.id });
            return result;
        } catch (error) {
            this.logger.error('Failed to update client in database', error as Error, { clientId: client.id });
            throw error;
        }
    }

    async destroy(id: string): Promise<void> {
        try {
            this.logger.debug('Deleting client from database', { clientId: id });
            await this.prisma.client.delete({
                where: { id },
            });
            this.logger.debug('Client deleted from database', { clientId: id });
        } catch (error) {
            this.logger.error('Failed to delete client from database', error as Error, { clientId: id });
            throw error;
        }
    }
}
