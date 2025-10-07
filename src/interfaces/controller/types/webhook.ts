import { WebhookHandlerDto } from '#/application/use-cases/webhook/webhook-handler.dto';

export interface IWebhookController {
    mercadoPago(request: WebhookHandlerDto): Promise<void>;
}
