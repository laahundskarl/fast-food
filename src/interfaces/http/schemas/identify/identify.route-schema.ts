import { identifyValidator, identifyResponseSchema } from '#/interfaces/http/schemas/identify/identify.schema';
import { errorNotFoundSchema, errorResponseValidationSchema } from '#/interfaces/http/schemas/until.schema';

export const identifySchema = {
    schema: {
        tags: ['Identificação'],
        summary: 'Identifica cliente pelo CPF',
        body: identifyValidator,
        response: {
            200: identifyResponseSchema,
            404: errorNotFoundSchema,
            400: errorResponseValidationSchema,
        },
    },
};
