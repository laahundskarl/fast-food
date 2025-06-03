import z from 'zod';

export const productCreateSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Cria produto',
        body: z.object({
            name: z.string(),
            description: z.string().optional(),
            value: z.number(),
            categoryId: z.string(),
        }),
    },
};

export const productGetSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Busca produto',
        params: z.object({
            id: z.string(),
        }),
    },
};

export const productListSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Lista produto',
        query: z.object({
            name: z.string().optional(),
            categoryId: z.string().optional(),
            productId: z.string().optional(),
        }),
    },
};

export const productUpdateSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Atualiza produto',
        body: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            value: z.number().optional(),
            categoryId: z.string().optional(),
            params: z.object({
                id: z.string().uuid(),
            }),
        }),
    },
};

export const productDeleteSchema = {
    schema: {
        tags: ['Produtos'],
        summary: 'Deleta produto',
        params: z.object({
            id: z.string().uuid(),
        }),
    },
};
