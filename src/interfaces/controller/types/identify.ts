import { FastifyRequest, FastifyReply } from 'fastify';

export interface IIdentifyController {
    get(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
