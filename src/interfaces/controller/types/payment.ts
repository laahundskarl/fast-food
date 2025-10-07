import { ListPaymentDto } from '#/application/use-cases/payment/list-payment/list-payment.dto';
import { PaymentResponseDTO } from '#/interfaces/presenter/payment/payment-response.dto';

export interface IPaymentController {
    get(id: string): Promise<PaymentResponseDTO>;
    list(query: ListPaymentDto): Promise<PaymentResponseDTO[]>;
}
