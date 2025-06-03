export const productCategoryGetSchema = {
    schema: {
        summary: 'Busca uma categoria de produtos',
        tags: ['Categoria'],
        // params: z.object()
    },
};

export const productCategoryListSchema = {
    schema: {
        summary: 'Lista e filtra as categorias de produtos',
        tags: ['Categoria'],
    },
};
