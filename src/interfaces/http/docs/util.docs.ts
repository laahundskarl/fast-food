import z from 'zod';

export const errorResponseValidationSchema = z.object({
    error: z.literal('Bad Request').describe('Tipo de erro HTTP'),
    message: z.string().describe('Mensagem geral do erro'),
    details: z
        .array(
            z.object({
                field: z.string().describe('Campo que apresentou erro'),
                message: z.string().describe('Mensagem de erro para o campo'),
            }),
        )
        .optional()
        .describe('Lista de detalhes dos erros de validação'),
});

export const errorNotFoundSchema = z.object({
    error: z.literal('Not Found').describe('Tipo de erro HTTP'),
    message: z.string().describe('Mensagem geral do erro'),
});

export const errorConflictSchema = z.object({
    error: z.literal('Error').describe('Tipo de erro HTTP'),
    message: z.string().describe('Mensagem geral do erro'),
});

export const errorBusinessSchema = z.object({
    error: z.literal('Error').describe('Tipo de erro HTTP'),
    message: z.string().describe('Mensagem geral do erro'),
});

export const deleteResponseSchema = z.object({
    message: z.string().describe('Mensagem de sucesso'),
});
