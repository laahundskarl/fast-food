import z from 'zod';

const baseErrorSchema = z.object({
    error: z.string().describe('Tipo de erro HTTP'),
    message: z.string().describe('Mensagem geral do erro'),
});

const validationDetailsSchema = z.object({
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

const createErrorSchema = (errorType: string, withDetails = false) => {
    const schema = baseErrorSchema.extend({
        error: z.literal(errorType).describe('Tipo de erro HTTP'),
    });

    return withDetails ? schema.merge(validationDetailsSchema) : schema;
};

export const errorResponseValidationSchema = createErrorSchema('Bad Request', true);
export const errorNotFoundSchema = createErrorSchema('Not Found');
export const errorConflictSchema = createErrorSchema('Error');
export const errorBusinessSchema = createErrorSchema('Error');

export const deleteResponseSchema = z.object({
    message: z.string().describe('Mensagem de sucesso'),
});
