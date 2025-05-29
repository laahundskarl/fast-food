import { FastifyInstance } from 'fastify';

import { ClientController } from '#/infrastructure/adapters/controller/client.controller';
import {
    schemaCreateClient,
    schemaDeleteClient,
    schemaGetClient,
    schemaUpdateClient,
} from '#/interfaces/http/routes/schema/client.schema';

export const clientRoute = (app: FastifyInstance) => {
    const controller = new ClientController();

    app.post('/', schemaCreateClient, controller.create.bind(controller));
    app.get('/:cpf', schemaGetClient, controller.get.bind(controller));
    app.put('/:cpf', schemaUpdateClient, controller.update.bind(controller));
    app.delete('/:cpf', schemaDeleteClient, controller.delete.bind(controller));
};
