import { Container } from 'inversify';

import { ICreatePayment } from '#/domain/gateways/create-payment';
import { IGetPayment } from '#/domain/gateways/get-payment';
import { TYPES } from '#/infrastructure/config/di/types';
import { MercadoPagoCreatePayment } from '#/infrastructure/gateways/mercado-pago/mercado-pago-create-payment';
import { MercadoPagoGetPayment } from '#/infrastructure/gateways/mercado-pago/mercado-pago-get-payment';

export function bindGateways(container: Container) {
    container.bind<ICreatePayment>(TYPES.CreatePaymentGateway).to(MercadoPagoCreatePayment).inSingletonScope();
    container.bind<IGetPayment>(TYPES.GetPaymentGateway).to(MercadoPagoGetPayment).inSingletonScope();
}
