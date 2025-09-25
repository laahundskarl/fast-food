import { IPayment } from '#/domain/entities/payment.entity';
import { PaymentPresenterOutput, PaymentWithOrderPresenterOutput } from '#/interfaces/presenter/payment.presenter';

export interface IPaymentPresenter {
    createPaymentPresenter(payment: IPayment): PaymentPresenterOutput;
    findPaymentsPresenter(payments: IPayment[]): PaymentPresenterOutput[];
    getPaymentPresenter(payment: IPayment): PaymentPresenterOutput | PaymentWithOrderPresenterOutput;
}
