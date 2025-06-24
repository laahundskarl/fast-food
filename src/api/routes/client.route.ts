import { FastifyInstance } from 'fastify';

import { ClientController } from '#/api/controllers/client.controller';
import { globalPrismaClient } from '#/database/prisma';
import {
    clientCreateDocs,
    clientGetSchema,
    clientGetWithOrdersSchema,
    clientUpdateSchema,
    clientDeleteSchema,
} from '#/docs/client.docs';
import { PrismaClientRepository } from '#/repositories/prisma/prisma-client.repository';

export const clientRoute = (app: FastifyInstance) => {
    const controller = new ClientController(new PrismaClientRepository(globalPrismaClient));
    app.post('/', clientCreateDocs, controller.create.bind(controller));
    app.get('/:cpf', clientGetSchema, controller.get.bind(controller));
    app.get('/orders/:cpf', clientGetWithOrdersSchema, controller.getWithOrders.bind(controller));
    app.patch('/:cpf', clientUpdateSchema, controller.update.bind(controller));
    app.delete('/:cpf', clientDeleteSchema, controller.delete.bind(controller));
};
