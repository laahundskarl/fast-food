import { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { TYPES } from '#/infrastructure/config/di/types';
import { ProductController } from '#/interfaces/controller/product.controller';
import {
    ProductCreateRequest,
    ProductParamsRequest,
    ProductQueryRequest,
    ProductUpdateRequest,
} from '#/interfaces/http/schemas/product/product-request.schema';
import {
    productCreateSchema,
    productDeleteSchema,
    productGetSchema,
    productListSchema,
    productUpdateSchema,
} from '#/interfaces/http/schemas/product/product.route-schema';

export const productRoute = (app: FastifyInstance) => {
    const controller = app.container.get<ProductController>(TYPES.ProductController);

    app.post<{ Body: ProductCreateRequest }>('/', productCreateSchema, async (req, reply) => {
        const response = await controller.create(req.body);
        reply.status(StatusCodes.CREATED).send(response);
    });

    app.delete<{ Params: ProductParamsRequest }>('/:id', productDeleteSchema, async (req, reply) => {
        const response = await controller.delete(req.params.id);
        return reply.send(response);
    });

    app.get<{ Params: ProductParamsRequest }>('/:id', productGetSchema, async (req, reply) => {
        const response = await controller.get(req.params.id);
        return reply.send(response);
    });

    app.get<{ Querystring: ProductQueryRequest }>('/', productListSchema, async (req, reply) => {
        const response = await controller.list(req.query);
        return reply.send(response);
    });

    app.patch<{
        Params: ProductParamsRequest;
        Body: ProductUpdateRequest;
    }>('/:id', productUpdateSchema, async (req, reply) => {
        const response = await controller.update(req.params.id, req.body);
        return reply.send(response);
    });
};
