import { GetPaymentOutput } from '#/domain/gateways/dto/get-payment-output';

export interface IGetPayment {
    execute(paymentId: string): Promise<GetPaymentOutput>;
}
