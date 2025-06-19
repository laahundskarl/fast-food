import { clientResponseSchema } from '#/api/schema/client.schema';
import { errorNotFoundSchema, errorResponseValidationSchema } from '#/docs/util.docs';
import { validatorIdentify } from '#/validator/identify.validator';

export const identifySchema = {
    schema: {
        tags: ['Identificação'],
        summary: 'Identifica cliente pelo CPF',
        body: validatorIdentify,
        response: {
            200: clientResponseSchema,
            404: errorNotFoundSchema,
            400: errorResponseValidationSchema,
        },
    },
};
