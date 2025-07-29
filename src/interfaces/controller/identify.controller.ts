import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { IdentifyDto } from '#/application/use-cases/identify/identify.dto';
import { IIdentifyUseCase } from '#/application/use-cases/identify/identify.use-case';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class IdentifyController {
    constructor(@inject(TYPES.IdentifyUseCase) private readonly identifyUseCase: IIdentifyUseCase) {}

    async get(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as IdentifyDto;
        const result = await this.identifyUseCase.execute(body);
        return reply.send(result);
    }
}
