import { FastifyInstance } from 'fastify';

import { ClientController } from '#/infrastructure/adapters/controller/client.controller';
import { schemaCreateClient } from '#/interfaces/http/routes/schema/client.schema';

export const clientRoute = (app: FastifyInstance) => {
    const controller = new ClientController();

    app.post('/', schemaCreateClient, controller.create.bind(controller));
    // app.get('/:cpf', clientListSchema, controller.find.bind(controller));
    // app.put('/', clientListSchema, controller.update.bind(controller));
    // app.delete('/:cpf', clientListSchema, controller.delete.bind(controller));
};
