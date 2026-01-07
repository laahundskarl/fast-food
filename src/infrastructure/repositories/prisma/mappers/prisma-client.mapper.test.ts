import { describe, expect, it } from 'vitest';

import { Client } from '#/domain/entities/client.entity';
import { PrismaClientMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-client.mapper';

describe('PrismaClientMapper', () => {
    const mockClientData = {
        id: 'client-123',
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john@example.com',
    };

    describe('toDomain', () => {
        it('should map prisma client data to domain Client entity', () => {
            const client = PrismaClientMapper.toDomain(mockClientData);

            expect(client).toBeInstanceOf(Client);
            expect(client.id).toBe(mockClientData.id);
            expect(client.name).toBe(mockClientData.name);
            expect(client.cpf).toBe(mockClientData.cpf);
            expect(client.email).toBe(mockClientData.email);
            expect(client.orders).toBeUndefined();
        });

        it('should map prisma client data with orders to domain Client entity', () => {
            const clientDataWithOrders = {
                ...mockClientData,
                orders: [
                    {
                        id: 'order-1',
                        value: 100,
                        orderNumber: 1,
                        status: 'WAITING',
                        orderProducts: [],
                    },
                ],
            };

            const client = PrismaClientMapper.toDomain(clientDataWithOrders);

            expect(client).toBeInstanceOf(Client);
            expect(client.orders).toBeDefined();
            expect(client.orders).toHaveLength(1);
        });
    });

    describe('toCreate', () => {
        it('should map domain Client to Prisma create input', () => {
            const client = new Client({
                name: 'Jane Doe',
                cpf: '98765432100',
                email: 'jane@example.com',
            });

            const createInput = PrismaClientMapper.toCreate(client);

            expect(createInput).toEqual({
                name: 'Jane Doe',
                cpf: '98765432100',
                email: 'jane@example.com',
            });
        });
    });

    describe('toUpdate', () => {
        it('should map domain Client to Prisma update input', () => {
            const client = new Client({
                id: 'client-456',
                name: 'Updated Name',
                cpf: '11122233344',
                email: 'updated@example.com',
            });

            const updateInput = PrismaClientMapper.toUpdate(client);

            expect(updateInput).toEqual({
                name: 'Updated Name',
                cpf: '11122233344',
                email: 'updated@example.com',
            });
        });
    });
});
