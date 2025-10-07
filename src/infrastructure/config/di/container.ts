import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { IValidatorTokenService } from '#/domain/services/validator-token.service';
import { bindControllers } from '#/infrastructure/config/di/bindings/controllers';
import { bindGateways } from '#/infrastructure/config/di/bindings/gateways';
import { bindOrchestration } from '#/infrastructure/config/di/bindings/orchestration';
import { bindRepositories } from '#/infrastructure/config/di/bindings/repositories';
import { bindUseCases } from '#/infrastructure/config/di/bindings/use-cases';
import { bindWebhooks } from '#/infrastructure/config/di/bindings/webhooks';
import { TYPES } from '#/infrastructure/config/di/types';
import { JwtValidatorTokenService } from '#/infrastructure/services/jwt-validator-token.service';
import { AuthMiddleware } from '#/interfaces/http/middlewares/auth.middleware';

const container = new Container();

// PrismaClient
container
    .bind<PrismaClient>(TYPES.PrismaClient)
    .toDynamicValue(() => {
        return new PrismaClient();
    })
    .inSingletonScope();

bindControllers(container);
bindGateways(container);
bindOrchestration(container);
bindRepositories(container);
bindUseCases(container);
bindWebhooks(container);

container.bind(AuthMiddleware).toSelf().inSingletonScope();
container.bind<IValidatorTokenService>(TYPES.ValidatorTokenService).to(JwtValidatorTokenService).inSingletonScope();

export { container };
