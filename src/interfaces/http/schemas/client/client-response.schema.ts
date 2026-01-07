import z from 'zod';

export const clientResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
});

export type ClientResponse = z.infer<typeof clientResponseSchema>;
