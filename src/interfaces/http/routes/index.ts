import { FastifyInstance } from 'fastify';

import { orderRoute } from '#/interfaces/http/routes/order.route';
import { productCategoryRoutes } from '#/interfaces/http/routes/product-category.routes';
import { productRoute } from '#/interfaces/http/routes/product.route';

export function registerRoutes(app: FastifyInstance) {
    app.register(orderRoute, { prefix: '/order' });
    app.register(productRoute, { prefix: '/product' });
    app.register(productCategoryRoutes, { prefix: '/product-category' });
}
