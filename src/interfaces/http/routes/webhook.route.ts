import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/types';
import { WebhookController } from '#/interfaces/controller/webhook.controller';
import { mercadoPagoWebhookSchema } from '#/interfaces/http/docs/webhook.docs';

export const webhookRoute = (app: FastifyInstance) => {
    const controller = app.container.get<WebhookController>(TYPES.WebhookController);

    app.post('/', mercadoPagoWebhookSchema, controller.mercadoPago.bind(controller));
};
