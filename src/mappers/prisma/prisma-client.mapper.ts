import { Prisma } from '@prisma/client';

import { Client, CreateClient } from '#/entities/client.entity';
import { ClientWithRelations } from '#/types/client.type';

export class PrismaClientMapper {
    static toDomain(data: ClientWithRelations): Client {
        return new Client({
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            id: data.id,
        });
    }

    static toCreate(data: CreateClient): Prisma.ClientCreateInput {
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
