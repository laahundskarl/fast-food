import { FastifyInstance } from 'fastify';

import { IdentifyController } from '#/api/controllers/identify.controller';
import { identifySchema } from '#/docs/identify.docs';

export const identityRoute = (app: FastifyInstance) => {
    const controller = new IdentifyController();
    app.post('/', identifySchema, controller.get.bind(controller));
};
