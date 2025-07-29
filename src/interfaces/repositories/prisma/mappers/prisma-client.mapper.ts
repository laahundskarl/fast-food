import { Prisma } from '@prisma/client';

import { Client } from '#/domain/entities/client.entity';
import { PrismaOrderMapper } from '#/interfaces/repositories/prisma/mappers/prisma-order.mapper';

export class PrismaClientMapper {
    static toDomain(data: any): Client {
        return new Client({
            id: data.id,
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            orders: data.orders?.map((order: any) => PrismaOrderMapper.toDomain(order)) || [],
        });
    }

    static toDomainSimple(data: any): Client {
        return new Client({
            id: data.id,
            name: data.name,
            cpf: data.cpf,
            email: data.email,
        });
    }

    static toCreate(data: Client): Prisma.ClientCreateInput {
        return {
            name: data.name,
            cpf: data.cpf,
            email: data.email,
        };
    }

    static toUpdate(data: Client): Prisma.ClientUpdateInput {
        return {
            name: data.name,
            cpf: data.cpf,
            email: data.email,
        };
    }
}
