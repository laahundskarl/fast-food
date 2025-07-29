import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/types';
import { IdentifyController } from '#/interfaces/controller/identify.controller';
import { identifySchema } from '#/interfaces/http/docs/identify.docs';

export const identityRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IdentifyController>(TYPES.IdentifyController);

    app.post('/', identifySchema, controller.get.bind(controller));
};
