import { FastifyInstance } from 'fastify';

import { clientRoute } from '#/interfaces/http/routes/client.route';
import { identityRoute } from '#/interfaces/http/routes/identify.route';
import { orderRoute } from '#/interfaces/http/routes/order.route';
import { productCategoryRoutes } from '#/interfaces/http/routes/product-category.routes';
import { productRoute } from '#/interfaces/http/routes/product.route';

export function registerRoutes(app: FastifyInstance) {
    app.register(clientRoute, { prefix: '/client' });
    app.register(identityRoute, { prefix: '/identify' });
    app.register(orderRoute, { prefix: '/order' });
    app.register(productRoute, { prefix: '/product' });
    app.register(productCategoryRoutes, { prefix: '/product-category' });
}
