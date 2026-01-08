import { FastifyInstance } from 'fastify';

import { clientRoute } from '#/interfaces/http/routes/client.route';
import { productCategoryRoutes } from '#/interfaces/http/routes/product-category.routes';
import { productRoute } from '#/interfaces/http/routes/product.route';

export function registerRoutes(app: FastifyInstance) {
    app.register(clientRoute, { prefix: '/client' });
    app.register(productRoute, { prefix: '/product' });
    app.register(productCategoryRoutes, { prefix: '/product-category' });
}
