import { FastifyInstance } from 'fastify';

import { ClientController } from '#/infrastructure/adapters/controller/client.controller';
import {
    createClientSchema,
    deleteClientSchema,
    getClientSchema,
    getClientWithOrdersSchema,
    updateClientSchema,
} from '#/interfaces/http/routes/schema/client.schema';

export const clientRoute = (app: FastifyInstance) => {
    const controller = new ClientController();
    app.post('/', createClientSchema, controller.create.bind(controller));
    app.get('/:cpf', getClientSchema, controller.get.bind(controller));
    app.get('/orders/:cpf', getClientWithOrdersSchema, controller.getWithOrders.bind(controller));
    app.patch('/:cpf', updateClientSchema, controller.update.bind(controller));
    app.delete('/:cpf', deleteClientSchema, controller.delete.bind(controller));
};
