import z from 'zod';

export const webhookSchema = {
    schema: {
        tags: ['Webhook'],
        summary: 'MercadoPago Webhook',
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
