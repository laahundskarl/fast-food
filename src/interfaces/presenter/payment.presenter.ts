import { IPayment } from '#/domain/entities/payment.entity';

export type PaymentPresenterOutput = {
    id: string;
    status: string;
    externalReference: string | null;
    qrCode: string | null;
};

export type PaymentWithOrderPresenterOutput = PaymentPresenterOutput & {
    order: {
        id: string;
        orderNumber: number;
        value: number;
        status: string;
    };
};

export class PaymentPresenter {
    static createPaymentPresenter(payment: IPayment): PaymentPresenterOutput {
        return {
            id: payment.id,
            status: payment.status,
            externalReference: payment.externalReference ?? null,
            qrCode: payment.qrCode ?? null,
        };
    }

    static findPaymentsPresenter(payments: IPayment[]): PaymentPresenterOutput[] {
        return payments.map(payment => this.createPaymentPresenter(payment));
    }

    static getPaymentPresenter(payment: IPayment): PaymentPresenterOutput | PaymentWithOrderPresenterOutput {
        const basePresentation = this.createPaymentPresenter(payment);

        if (payment.order) {
            return {
                ...basePresentation,
                order: {
                    id: payment.order.id,
                    orderNumber: payment.order.orderNumber,
                    value: payment.order.value,
                    status: payment.order.status,
                },
            };
        }

        return basePresentation;
    }
}
