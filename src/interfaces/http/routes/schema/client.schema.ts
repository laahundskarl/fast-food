import { validatorCreateClient, validatorUpdateClient } from '#/interfaces/http/routes/schema/validator/client.validator';

export const schemaCreateClient = {
    summary: 'Register client',
    tags: ['client'],
    schema: {
        body: validatorCreateClient,
    },
};

export const schemaGetClient = {
    summary: 'Get client',
    tags: ['client'],
    schema: {},
};

export const schemaGetClientWithOrders = {
    summary: 'Get client with orders',
    tags: ['client'],
    schema: {},
};

export const schemaUpdateClient = {
    summary: 'Update client',
    tags: ['client'],
    schema: {
        body: validatorUpdateClient,
    },
};

export const schemaDeleteClient = {
    summary: 'Delete client',
    tags: ['client'],
    schema: {},
};
