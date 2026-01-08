import z from 'zod';

export const deleteResponseSchema = z.object({
    message: z.string().describe('Mensagem de sucesso'),
});

export type DeleteResponse = z.infer<typeof deleteResponseSchema>;
