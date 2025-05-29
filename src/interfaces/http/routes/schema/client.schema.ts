import { validatorClient } from '#/interfaces/http/routes/schema/validator/client.validator';

export const schemaCreateClient = {
    summary: 'Register client',
    tags: ['client'],
    schema: {
        body: validatorClient,
    },
};

export const schemaGetClient = {
    summary: 'Get client',
    tags: ['client'],
    schema: {},
};

export const schemaUpdateClient = {
    summary: 'Update client',
    tags: ['client'],
    schema: {
        body: validatorClient,
    },
};

export const schemaDeleteClient = {
    summary: 'Delete client',
    tags: ['client'],
    schema: {},
};
