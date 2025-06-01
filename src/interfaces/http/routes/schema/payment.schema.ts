import { StatusPayment } from '#/core/domain/entities/payment.entity';
import { z } from 'zod';

export const paymentUpsertSchema = {
    schema: z.object({
        body: z.object({
            orderId: z.string(),
            status: z.nativeEnum(StatusPayment),
        }),
    }),
};
