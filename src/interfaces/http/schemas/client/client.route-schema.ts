import {
    clientCreateValidator,
    clientResponseSchema,
    clientUpdateValidator,
    clientParamsValidator,
} from '#/interfaces/http/schemas/client/client.schema';
import {
    deleteResponseSchema,
    errorConflictSchema,
    errorNotFoundSchema,
    errorResponseValidationSchema,
} from '#/interfaces/http/schemas/until.schema';

export const clientCreateSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Registrar cliente',
        body: clientCreateValidator,
        response: {
            201: clientResponseSchema,
            400: errorResponseValidationSchema,
            409: errorConflictSchema,
        },
    },
};

export const clientGetSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Buscar cliente',
        params: clientParamsValidator,
        response: {
            200: clientResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const clientUpdateSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Atualizar cliente',
        body: clientUpdateValidator,
        response: {
            200: clientResponseSchema,
            400: errorResponseValidationSchema,
            404: errorNotFoundSchema,
        },
    },
};

export const clientDeleteSchema = {
    schema: {
        tags: ['Clientes'],
        summary: 'Deletar cliente',
        params: clientParamsValidator,
        response: {
            200: deleteResponseSchema,
            404: errorNotFoundSchema,
        },
    },
};
