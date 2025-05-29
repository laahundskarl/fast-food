import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify, { FastifyInstance } from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { errorHandler } from '#/interfaces/errors/error-handler';
import { clientRoute } from '#/interfaces/http/routes/client.route';
import { orderRoute } from '#/interfaces/http/routes/order.route';
import { productCategoryRoutes } from '#/interfaces/http/routes/product-category.routes';
import { productRoute } from '#/interfaces/http/routes/product.route';

export function buildApp(): FastifyInstance {
    const app = fastify({ logger: true });

    app.setSerializerCompiler(serializerCompiler);
    app.setValidatorCompiler(validatorCompiler);

    app.register(fastifyCors);

    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'fast-food',
                version: '0.0.1',
            },
        },
        transform: jsonSchemaTransform,
    });
    app.register(fastifySwaggerUi, {
        routePrefix: '/docs',
    });

    app.register(clientRoute, { prefix: '/client' });
    app.register(orderRoute, { prefix: '/order' });
    app.register(productRoute, { prefix: '/product' });
    app.register(productCategoryRoutes, { prefix: '/product-category' });

    app.setErrorHandler(errorHandler);

    return app;
}
