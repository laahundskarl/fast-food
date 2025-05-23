import { FastifyInstance } from 'fastify';

import { ClientController } from '#/infrastructure/adapters/controller/client.controller';

export const clientRoute = (app: FastifyInstance) => {
    const controller = new ClientController();

    app.get('/:cpf', controller.findByCpf.bind(controller));
};
