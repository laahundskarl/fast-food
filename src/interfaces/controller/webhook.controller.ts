import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { IWebhookHandlerUseCase } from '#/domain/gateways/webhook-message';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class WebhookController {
    constructor(
        @inject(TYPES.WebhookHandler)
        private readonly webhookHandler: IWebhookHandlerUseCase,
    ) {}

    async mercadoPago(request: FastifyRequest, reply: FastifyReply) {
        const webhookData = request.body;
        await this.webhookHandler.execute(webhookData);
        return reply.status(200).send();
    }
}
