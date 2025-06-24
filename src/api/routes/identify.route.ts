import { FastifyInstance } from 'fastify';

import { IdentifyController } from '#/api/controllers/identify.controller';
import { globalPrismaClient } from '#/database/prisma';
import { identifySchema } from '#/docs/identify.docs';
import { PrismaClientRepository } from '#/repositories/prisma/prisma-client.repository';

export const identityRoute = (app: FastifyInstance) => {
    const controller = new IdentifyController(new PrismaClientRepository(globalPrismaClient));
    app.post('/', identifySchema, controller.get.bind(controller));
};
