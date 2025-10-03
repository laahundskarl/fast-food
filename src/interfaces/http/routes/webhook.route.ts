import { FastifyInstance } from 'fastify';

import { WebhookHandlerDto } from '#/application/use-cases/webhook/webhook-handler.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IWebhookController } from '#/interfaces/controller/types/webhook';
import { webhookSchema } from '#/interfaces/http/schemas/webhook/webhook.route-schema';

export const webhookRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IWebhookController>(TYPES.WebhookController);

    app.post('/', webhookSchema, async (req, reply) => {
        const body = req.body as WebhookHandlerDto;
        await controller.mercadoPago(body);
        return reply.status(204).send();
    });
};
