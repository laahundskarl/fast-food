import { FastifyInstance } from 'fastify';

import { TYPES } from '#/infrastructure/config/di/types';
import { ProductCategoryController } from '#/interfaces/controller/product-category.controller';
import {
    ProductCategoryGetQueryRequest,
    ProductCategoryParamsRequest,
    ProductCategoryListQueryRequest,
} from '#/interfaces/http/schemas/product-category/product-category-request.schema';
import {
    productCategoryGetSchema,
    productCategoryListSchema,
} from '#/interfaces/http/schemas/product-category/product-category.route-schema';

export function productCategoryRoutes(app: FastifyInstance) {
    const controller = app.container.get<ProductCategoryController>(TYPES.ProductCategoryController);

    app.get<{
        Params: ProductCategoryParamsRequest;
        Querystring: ProductCategoryGetQueryRequest;
    }>('/:id', productCategoryGetSchema, async (req, reply) => {
        const response = await controller.get(req.params.id, req.query);
        return reply.send(response);
    });

    app.get<{ Querystring: ProductCategoryListQueryRequest }>('/', productCategoryListSchema, async (req, reply) => {
        const response = await controller.list(req.query);
        return reply.send(response);
    });
}
