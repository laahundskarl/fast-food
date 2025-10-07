import { FastifyInstance } from 'fastify';

import { CreateProductDto } from '#/application/use-cases/product/create-product/create-product.dto';
import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { UpdateProductDto } from '#/application/use-cases/product/update-product/update-product.dto';
import { TYPES } from '#/infrastructure/config/di/types';
import { IProductController } from '#/interfaces/controller/types/product';
import {
    productCreateSchema,
    productDeleteSchema,
    productGetSchema,
    productListSchema,
    productUpdateSchema,
} from '#/interfaces/http/schemas/product/product.route-schema';

export const productRoute = (app: FastifyInstance) => {
    const controller = app.container.get<IProductController>(TYPES.ProductController);

    app.post('/', productCreateSchema, async (req, reply) => {
        const body = req.body as CreateProductDto;
        const response = await controller.create(body);
        reply.status(201).send(response);
    });

    app.delete('/:id', productDeleteSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        await controller.delete(id);
        return reply.send({ message: 'Product deleted successfully' });
    });

    app.get('/:id', productGetSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        const response = await controller.get(id);
        return reply.send(response);
    });

    app.get('/', productListSchema, async (req, reply) => {
        const query = req.query as ListProductDto;
        const response = await controller.list(query);
        return reply.send(response);
    });

    app.patch('/:id', productUpdateSchema, async (req, reply) => {
        const id = (req.params as { id: string }).id;
        const body = req.body as UpdateProductDto;
        const response = await controller.update(id, body);
        return reply.send(response);
    });
};
