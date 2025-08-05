import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { WebhookHandlerDto } from '#/application/use-cases/webhook/webhook-handler.dto';
import { IWebhookHandlerUseCase } from '#/application/use-cases/webhook/webhook-handler.use-case';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class WebhookController {
    constructor(@inject(TYPES.WebhookHandlerUseCase) private readonly webhookHandler: IWebhookHandlerUseCase) {}

    async mercadoPago(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as WebhookHandlerDto;
        await this.webhookHandler.execute(body);
        return reply.status(204).send();
    }
}
