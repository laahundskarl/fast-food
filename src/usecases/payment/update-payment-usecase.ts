import { OrderStatus, StatusPayment } from '@prisma/client';

import { PaymentUpdateDto } from '#/dto/payment.dto';
import { Payment } from '#/entities/payment.entity';
import { NotFoundError } from '#/errors/app-error';
import { IOrderRepository } from '#/repositories/order.repository';
import { IPaymentRepository } from '#/repositories/payment.repository';

export class UpdatePaymentUseCase {
    constructor(
        private readonly paymentRepository: IPaymentRepository,
        private readonly orderRepository: IOrderRepository,
    ) {}

    async execute(id: string, payment: PaymentUpdateDto): Promise<Payment> {
        const paymentFound = await this.paymentRepository.findById(id);
        const updatedPayment = await this.paymentRepository.update(id, payment);
        const order = await this.orderRepository.findById(paymentFound.order!.id!);
        if (!order) {
            throw new NotFoundError('Order not found');
        }
        order.status = payment.status === StatusPayment.APPROVED ? OrderStatus.IN_PROGRESS : OrderStatus.CANCELED;
        await this.orderRepository.updateStatus(order.id!, order);

        return updatedPayment;
    }
}
