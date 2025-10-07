import { Container } from 'inversify';

import { ClientOrchestration } from '#/application/orchestration/client.orchestration';
import { IClientOrchestration } from '#/application/orchestration/interfaces/i-client.orchestration';
import { IPaymentOrchestration } from '#/application/orchestration/interfaces/i-payment.orchestration';
import { IProductOrchestration } from '#/application/orchestration/interfaces/i-product.orchestration';
import { PaymentOrchestration } from '#/application/orchestration/payment.orchestration';
import { ProductOrchestration } from '#/application/orchestration/product.orchestration';
import { TYPES } from '#/infrastructure/config/di/types';

export function bindOrchestration(container: Container) {
    container.bind<IProductOrchestration>(TYPES.ProductOrchestration).to(ProductOrchestration);
    container.bind<IClientOrchestration>(TYPES.ClientOrchestration).to(ClientOrchestration);
    container.bind<IPaymentOrchestration>(TYPES.PaymentOrchestration).to(PaymentOrchestration);
}
