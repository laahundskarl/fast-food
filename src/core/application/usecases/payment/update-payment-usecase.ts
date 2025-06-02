import { OrderStatus, StatusPayment } from '@prisma/client';

import { Payment } from '#/core/domain/entities/payment.entity';
import { OrderRepository } from '#/core/domain/repositories/order.repository';
import { PaymentRepository } from '#/core/domain/repositories/payment.repository';
import { NotFoundError } from '#/core/shared/errors/app-error';
import { PaymentUpdateDto } from '#/infrastructure/adapters/dto/payment.dto';

export class UpdatePaymentUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly orderRepository: OrderRepository,
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
