import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/di/types';
import { IClientController } from '#/interfaces/controller/types/client';
import {
    clientCreateDocs,
    clientGetSchema,
    clientGetWithOrdersSchema,
    clientUpdateSchema,
    clientDeleteSchema,
} from '#/interfaces/http/docs/client.docs';

export const clientRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IClientController>(TYPES.ClientController);

    app.post('/', clientCreateDocs, controller.create.bind(controller));
    app.delete('/:cpf', clientDeleteSchema, controller.delete.bind(controller));
    app.get('/:cpf', clientGetSchema, controller.get.bind(controller));
    app.get('/orders/:cpf', clientGetWithOrdersSchema, controller.getOrders.bind(controller));
    app.patch('/:cpf', clientUpdateSchema, controller.update.bind(controller));
};
