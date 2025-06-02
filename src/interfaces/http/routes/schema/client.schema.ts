import {
    validatorCreateClient,
    validatorUpdateClient,
} from '#/interfaces/http/routes/schema/validator/client.validator';

export const createClientSchema = {
    summary: 'Register client',
    tags: ['client'],
    schema: {
        body: validatorCreateClient,
    },
};

export const getClientSchema = {
    summary: 'Get client',
    tags: ['client'],
    schema: {},
};

export const getClientWithOrdersSchema = {
    summary: 'Get client with orders',
    tags: ['client'],
    schema: {},
};

export const updateClientSchema = {
    summary: 'Update client',
    tags: ['client'],
    schema: {
        body: validatorUpdateClient,
    },
};

export const deleteClientSchema = {
    summary: 'Delete client',
    tags: ['client'],
    schema: {},
};
