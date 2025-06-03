import z from 'zod';

export const productResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    value: z.number(),
    description: z.string(),
    category: z.object({
        id: z.string().uuid(),
        name: z.string(),
    }),
});

export const productDeleteResponseSchema = z.object({
    message: z.string().describe('Mensagem de sucesso'),
});
