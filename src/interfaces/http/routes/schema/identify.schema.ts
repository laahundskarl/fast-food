import { validatorIdentify } from '#/interfaces/http/routes/schema/validator/identify.validator';

export const schemaIdentify = {
    summary: 'Identify',
    tags: ['identify'],
    schema: {
        body: validatorIdentify,
    },
};
