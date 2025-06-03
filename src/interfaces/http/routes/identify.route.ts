import { FastifyInstance } from 'fastify';

import { IdentifyController } from '#/infrastructure/adapters/controller/identify.controller';
import { identifySchema } from '#/interfaces/http/docs/identify.docs';

export const identityRoute = (app: FastifyInstance) => {
    const controller = new IdentifyController();
    app.post('/', identifySchema, controller.get.bind(controller));
};
