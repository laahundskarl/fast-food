export const validatorErrorResponseSwagger = {
    description: 'Validation error response',
    type: 'object',
    properties: {
        error: { type: 'number' },
        message: { type: 'string' },
        details: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    field: { type: 'string' },
                    message: { type: 'string' },
                },
            },
        },
    },
};
