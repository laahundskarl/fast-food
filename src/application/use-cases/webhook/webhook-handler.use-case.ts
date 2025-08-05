import { WebhookHandlerDto } from '#/application/use-cases/webhook/webhook-handler.dto';

export interface IWebhookHandlerUseCase {
    execute(request: WebhookHandlerDto): Promise<void>;
}
