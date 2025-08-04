import { IWebhookMessage } from '#/domain/gateways/webhook-message';

export interface IWebhookHandlerUseCase {
    execute(request: IWebhookMessage): Promise<void>;
}
