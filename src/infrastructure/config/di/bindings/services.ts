import { Container } from 'inversify';

import { ClientOrchestrationService } from '#/application/services/client-orchestration.service';
import { PaymentOrchestrationService } from '#/application/services/payment-orchestration.service';
import { ProductOrchestrationService } from '#/application/services/product-orchestration.service';
import { TYPES } from '#/infrastructure/config/di/types';

export function bindServices(container: Container) {
    container.bind<ProductOrchestrationService>(TYPES.ProductOrchestrationService).to(ProductOrchestrationService);
    container.bind<ClientOrchestrationService>(TYPES.ClientOrchestrationService).to(ClientOrchestrationService);
    container.bind<PaymentOrchestrationService>(TYPES.PaymentOrchestrationService).to(PaymentOrchestrationService);
}
