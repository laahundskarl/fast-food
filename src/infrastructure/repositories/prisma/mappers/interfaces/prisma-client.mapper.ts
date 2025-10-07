import { Client as PrismaClient } from '@prisma/client';

import { IClient } from '#/domain/entities/client.entity';

export interface IPrismaClientMapper {
    toCreate(client: IClient): Omit<PrismaClient, 'createdAt' | 'updatedAt'>;
    toUpdate(client: IClient): Omit<PrismaClient, 'createdAt' | 'updatedAt'>;
    toDomain(client: PrismaClient & { orders?: any[] }): IClient;
    toDomainSimple(client: PrismaClient): IClient;
}
