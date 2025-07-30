import { OrderStatus, StatusPayment } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { UpdatePaymentDto } from '#/application/use-cases/payment/update-payment/update-payment.dto';
import { IUpdatePaymentUseCase } from '#/application/use-cases/payment/update-payment/update-payment.use-case';
import { Payment } from '#/domain/entities/payment.entity';
import { NotFoundError } from '#/domain/errors';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { TYPES } from '#/infrastructure/config/types';

@injectable()
export class UpdatePayment implements IUpdatePaymentUseCase {
    constructor(
        @inject(TYPES.PaymentRepository) private readonly paymentRepository: IPaymentRepository,
        @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
    ) {}

    async execute(id: string, paymentUpdate: UpdatePaymentDto): Promise<Payment> {
        const paymentFound = await this.paymentRepository.findById(id);
        if (!paymentFound) {
            throw new NotFoundError('Payment not found');
        }

        if (!paymentFound.order?.id) {
            throw new NotFoundError('Payment order not found');
        }

        const order = await this.orderRepository.findById(paymentFound.order.id);
        if (!order) {
            throw new NotFoundError('Order not found');
        }

        const updatedPaymentData = new Payment({
            id: paymentFound.id,
            status: paymentUpdate.status ?? paymentFound.status,
            order: paymentFound.order,
            externalReference: paymentUpdate.externalReference ?? paymentFound.externalReference ?? undefined,
            qrCode: paymentUpdate.qrCode ?? paymentFound.qrCode ?? undefined,
        });

        const updatedPayment = await this.paymentRepository.update(id, updatedPaymentData);

        if (paymentUpdate.status) {
            const newOrderStatus = this.determineOrderStatus(paymentUpdate.status);
            order.status = newOrderStatus;
            await this.orderRepository.updateStatus(order.id, order);
        }

        return updatedPayment;
    }

    private determineOrderStatus(paymentStatus: StatusPayment): OrderStatus {
        switch (paymentStatus) {
            case StatusPayment.APPROVED:
                return OrderStatus.IN_PROGRESS;
            case StatusPayment.REJECTED:
                return OrderStatus.CANCELED;
            case StatusPayment.PENDING:
            default:
                return OrderStatus.WAITING;
        }
    }
}
