import { Prisma } from '@prisma/client';

import { Client, ClientPayload } from '#/domain/entities/client.entity';
import { PrismaOrderMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-order.mapper';

export class PrismaClientMapper {
    static toDomain(data: any): Client {
        return new Client({
            id: data.id,
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            ...(data.orders && {
                orders: data.orders?.map((order: any) => PrismaOrderMapper.toDomain(order)),
            }),
        } as ClientPayload);
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
