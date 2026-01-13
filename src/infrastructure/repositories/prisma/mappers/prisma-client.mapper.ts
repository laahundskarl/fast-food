import { Client as PrismaClient, Prisma } from '@prisma/client';

import { Client, ClientPayload } from '#/domain/entities/client.entity';

export class PrismaClientMapper {
    static toDomain(data: PrismaClient): Client {
        return new Client({
            id: data.id,
            name: data.name,
            cpf: data.cpf,
            email: data.email,
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

    static toPrisma(data: Client): Prisma.ClientUpdateManyArgs {
        return {
            where: { id: data.id },
            data: {
                name: data.name,
                cpf: data.cpf,
                updatedAt: new Date(Date.now()),
                id: data.id,
                createdAt: new Date(Date.now()),
                email: data.email,
            },
        };
    }

    static toPrismaUpdate(data: Client): Prisma.ClientUpdateInput {
        return {
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            updatedAt: new Date(Date.now()),
        };
    }
}
