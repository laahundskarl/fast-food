import { Container } from 'inversify';

import { WebhookHandler } from '#/application/use-cases/webhook/webhook-handler';
import { IWebhookHandlerUseCase } from '#/application/use-cases/webhook/webhook-handler.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IWebhookController } from '#/interfaces/controller/types/webhook';
import { WebhookController } from '#/interfaces/controller/webhook.controller';

export function bindWebhooks(container: Container) {
    container.bind<IWebhookHandlerUseCase>(TYPES.WebhookHandlerUseCase).to(WebhookHandler).inSingletonScope();
    container.bind<IWebhookController>(TYPES.WebhookController).to(WebhookController).inSingletonScope();
}
