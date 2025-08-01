import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';

import { PaymentExternalError } from '#/domain/errors';
import { CreateQrCodeInput } from '#/domain/gateways/dto/create-qr-code-input';
import { QrCodeOutput } from '#/domain/gateways/dto/qr-code-output';
import { IPaymentGateway } from '#/domain/gateways/payment-gateway';
import { env } from '#/infrastructure/config/env';

@injectable()
export class MercadoPagoPaymentGateway implements IPaymentGateway {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: env.MERCADO_PAGO_BASE_URL,
            headers: {
                Authorization: `Bearer ${env.MERCADO_PAGO_TOKEN}`,
            },
        });
    }

    async execute(request: CreateQrCodeInput): Promise<QrCodeOutput> {
        try {
            const userId = env.MERCADO_PAGO_USER_ID;
            const externalPosId = env.MERCADO_PAGO_POS_ID;

            const response = await this.httpClient.post(
                `/instore/orders/qr/seller/collectors/${userId}/pos/${externalPosId}/qrs`,
                {
                    external_reference: request.orderId,
                    // notification_url: 'https://www.yourdomain.com/ipn', WEBHOOK
                    total_amount: request.amount,
                    items: request.items.map(item => ({
                        sku_number: item.product.id,
                        category: item.product.category!.id,
                        title: item.product.name,
                        description: item.product.description,
                        quantity: item.amount,
                        unit_measure: 'unit',
                        unit_price: item.product.value,
                        total_amount: item.value,
                    })),
                    title: 'Compra em fast-food',
                    description: 'Compra em fast-food',
                },
            );

            return {
                externalReference: response.data.in_store_order_id,
                qrCode: response.data.qr_data,
            };
        } catch (error) {
            throw new PaymentExternalError('Failed to create payment with Mercado Pago', error);
        }
    }
}
