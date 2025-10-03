import { FastifyInstance } from 'fastify';

import { IdentifyDto } from '#/application/use-cases/identify/identify.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IIdentifyController } from '#/interfaces/controller/types/identify';
import { identifySchema } from '#/interfaces/http/schemas/identify/identify.route-schema';

export const identityRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IIdentifyController>(TYPES.IdentifyController);

    app.post('/', identifySchema, async (req, reply) => {
        const body = req.body as IdentifyDto;
        await controller.get(body);
        return reply.status(201).send();
    });
};
