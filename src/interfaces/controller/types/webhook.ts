import { FastifyRequest, FastifyReply } from 'fastify';

export interface IWebhookController {
    mercadoPago(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
