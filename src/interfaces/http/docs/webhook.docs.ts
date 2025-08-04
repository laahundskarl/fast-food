import z from 'zod';

export const mercadoPagoWebhookSchema = {
    schema: {
        tags: ['Webhook'],
        summary: 'MercadoPago webhook',
        body: z.object({
            data: z.object({
                id: z.string(),
            }),
        }),
        response: {
            200: z.object({}),
        },
    },
};
