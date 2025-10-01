import z from 'zod';

import { errorNotFoundSchema } from '#/interfaces/http/docs/util.docs';

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
            200: {
                $ref: 'PaymentResponseDTO#',
            },
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
            200: {
                type: 'array',
                items: { $ref: 'PaymentResponseDTO#' },
            },
            404: errorNotFoundSchema,
        },
    },
};
