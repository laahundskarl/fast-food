import { FastifyInstance } from 'fastify';

import { ClientController } from '#/api/controllers/client.controller';
import {
    clientCreateDocs,
    clientGetSchema,
    clientGetWithOrdersSchema,
    clientUpdateSchema,
    clientDeleteSchema,
} from '#/docs/client.docs';

export const clientRoute = (app: FastifyInstance) => {
    const controller = new ClientController();
    app.post('/', clientCreateDocs, controller.create.bind(controller));
    app.get('/:cpf', clientGetSchema, controller.get.bind(controller));
    app.get('/orders/:cpf', clientGetWithOrdersSchema, controller.getWithOrders.bind(controller));
    app.patch('/:cpf', clientUpdateSchema, controller.update.bind(controller));
    app.delete('/:cpf', clientDeleteSchema, controller.delete.bind(controller));
};
