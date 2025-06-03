import { validatorIdentify } from '#/interfaces/http/validator/identify.validator';

export const identifySchema = {
    schema: {
        tags: ['Identificação'],
        summary: 'Identifica cliente pelo CPF',
        body: validatorIdentify,
    },
};
