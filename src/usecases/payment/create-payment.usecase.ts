// import { PaymentCreateDTO } from '#/dto/payment.dto';
import { IPaymentRepository } from '#/repositories/payment.repository';

export class CreatePaymentUseCase {
    constructor(private readonly paymentRepository: IPaymentRepository) {}

    /**
     * TODO: ERRO AO IMPORTAR O PaymentCreateDTO
     */
    // async execute(payment: PaymentCreateDTO): Promise<any> {
    // return await this.paymentRepository.create(payment);
    // }
}
