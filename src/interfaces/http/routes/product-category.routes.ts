import { FastifyInstance } from 'fastify';

import { ListProductCategoryDto } from '#/application/use-cases/product-category/list-product-category/list-product-category.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IProductCategoryController } from '#/interfaces/controller/types/product-category';
import {
    productCategoryGetSchema,
    productCategoryListSchema,
} from '#/interfaces/http/schemas/product-category/product-category.route-schema';

export function productCategoryRoutes(app: FastifyInstance) {
    const controller = app.container.get<IProductCategoryController>(TYPES.ProductCategoryController);

    app.get('/:id', productCategoryGetSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        const include = (req.query as { include?: string }).include;

        const includes = include ? include.split(',') : [];
        const response = await controller.get(id, includes);
        return reply.send(response);
    });

    app.get('/', productCategoryListSchema, async (req, reply) => {
        const query = req.query as ListProductCategoryDto;
        const response = await controller.list(query);
        return reply.send(response);
    });
}
