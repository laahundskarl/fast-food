import z from 'zod';

import { paymentResponseSchema, paymentQueryValidator } from '#/interfaces/http/schemas/payment/payment.schema';
import { errorNotFoundSchema } from '#/interfaces/http/schemas/until.schema';

export const paymentGetSchema = {
    schema: {
        tags: ['Pagamentos'],
        summary: 'Busca pagamento',
        query: paymentQueryValidator,
        response: {
            200: paymentResponseSchema,
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
