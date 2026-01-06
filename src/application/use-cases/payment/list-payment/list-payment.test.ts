import { describe, expect, it } from 'vitest';

import { ListPayment } from '#/application/use-cases/payment/list-payment/list-payment';
import * as paymentMock from '#/infrastructure/repositories/prisma/mocks/prisma-payment-mock.repository';

describe('list-payment', () => {
    const paymentRepository = new paymentMock.PrismaPaymentMockRepository();
    const listPaymentUseCase = new ListPayment(paymentRepository);

    it('should list payments', async () => {
        const listMock = paymentMock.mockPaymentList({});

        const result = await listPaymentUseCase.execute();

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            id: '1',
            status: 'PENDING',
        });
        expect(listMock).toHaveBeenCalled();
    });

    it('should return empty array when no payments exist', async () => {
        paymentMock.mockPaymentList({ data: [] });

        const result = await listPaymentUseCase.execute();

        expect(result).toHaveLength(0);
    });
});
