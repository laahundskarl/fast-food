import z from 'zod';

export const orderListSchema = {
    schema: z.object({
        orderId: z.string(),
    }),
};
