import { FastifyInstance } from 'fastify';

import { clientRoute } from '#/api/routes/client.route';
import { identityRoute } from '#/api/routes/identify.route';
import { orderRoute } from '#/api/routes/order.route';
import { paymentRoute } from '#/api/routes/payment.route';
import { productCategoryRoutes } from '#/api/routes/product-category.routes';
import { productRoute } from '#/api/routes/product.route';

export function registerRoutes(app: FastifyInstance) {
    app.register(clientRoute, { prefix: '/client' });
    app.register(identityRoute, { prefix: '/identify' });
    app.register(orderRoute, { prefix: '/order' });
    app.register(productRoute, { prefix: '/product' });
    app.register(productCategoryRoutes, { prefix: '/product-category' });
    app.register(paymentRoute, { prefix: '/payment' });
}
