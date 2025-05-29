import { FastifyInstance } from 'fastify';

import { IdentifyController } from '#/infrastructure/adapters/controller/identify.controller';
import { schemaIdentify } from '#/interfaces/http/routes/schema/identify.schema';

export const identityRoute = (app: FastifyInstance) => {
    const controller = new IdentifyController();

    app.post('/', schemaIdentify, controller.get.bind(controller));
};
