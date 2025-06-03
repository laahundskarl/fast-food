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
        .describe('Lista de detalhes dos erros de validação'),
});

export const errorNotFoundSchema = z.object({
    error: z.literal('Bad Request').describe('Tipo de erro HTTP'),
    message: z.string().describe('Mensagem geral do erro'),
});
