import { StatusPayment } from '@prisma/client';
import z from 'zod';

import { errorNotFoundSchema, errorResponseValidationSchema } from '#/interfaces/http/docs/util.docs';
import { paymentResponseSchema } from '#/interfaces/http/schema/payment.schema';

export const paymentGetSchema = {
    schema: {
        tags: ['Pagamentos'],
        summary: 'Busca pagamento',
        query: z.object({
            name: z.string().optional(),
            categoryId: z.string().uuid().optional(),
            productId: z.string().uuid().optional(),
        }),
        response: {
            // 200: paymentResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const paymentListSchema = {
    schema: {
        tags: ['Pagamentos'],
        summary: 'Lista pagamentos',
        params: z.object({
            orderId: z.string().optional(),
            status: z.string().optional(),
        }),
        response: {
            200: z.array(paymentResponseSchema),
            404: errorNotFoundSchema,
        },
    },
};

export const paymentUpdateSchema = {
    schema: {
        tags: ['Pagamentos'],
        summary: 'Atualiza pagamento',
        body: z.object({
            status: z.enum([StatusPayment.PENDING, StatusPayment.APPROVED, StatusPayment.REJECTED]),
        }),
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: paymentResponseSchema,
            404: errorNotFoundSchema,
            400: errorResponseValidationSchema,
        },
    },
};
