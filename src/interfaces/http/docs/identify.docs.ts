import { errorNotFoundSchema, errorResponseValidationSchema } from '#/interfaces/http/docs/util.docs';
import { clientResponseSchema } from '#/interfaces/http/schema/client.schema';
import { validatorIdentify } from '#/interfaces/http/validator/identify.validator';

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
