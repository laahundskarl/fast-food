import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';

import { PaymentExternalError } from '#/domain/errors';
import { GetPaymentOutput } from '#/domain/gateways/dto/get-payment-output';
import { IGetPayment } from '#/domain/gateways/get-payment';
import { env } from '#/infrastructure/config/env';

@injectable()
export class MercadoPagoGetPayment implements IGetPayment {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: env.MERCADO_PAGO_BASE_URL,
            headers: {
                Authorization: `Bearer ${env.MERCADO_PAGO_TOKEN}`,
            },
        });
    }

    async execute(paymentId: string): Promise<GetPaymentOutput> {
        try {
            const response = await this.httpClient.get(`/v1/payments/${paymentId}`);

            return {
                externalReference: response.data.external_reference,
                status: response.data.status,
            };
        } catch (error) {
            throw new PaymentExternalError('Failed to get payment in Mercado Pago', error);
        }
    }
}
