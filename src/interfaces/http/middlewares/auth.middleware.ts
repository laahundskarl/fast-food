import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { IValidatorTokenService } from '#/domain/services/validator-token.service';
import { TYPES } from '#/infrastructure/config/di/types';

@injectable()
export class AuthMiddleware {
    constructor(@inject(TYPES.ValidatorTokenService) private readonly validatorTokenService: IValidatorTokenService) {}

    handle = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const authHeader = request.headers['authorization'];

            if (authHeader) {
                const [scheme, token] = authHeader.split(' ');
                if (scheme !== 'Bearer' || !token) {
                    return reply.status(401).send({ message: 'Invalid token' });
                }

                this.validatorTokenService.validate(token);
            }
        } catch (err: any) {
            return reply.status(401).send({ message: err.message });
        }
    };
}
