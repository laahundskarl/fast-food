import { FastifyInstance } from 'fastify';

import { orderRoute } from '#/interfaces/http/routes/order.route';
import { productRoute } from '#/interfaces/http/routes/product.route';

export function registerRoutes(app: FastifyInstance) {
    app.register(orderRoute, { prefix: '/order' });
    app.register(productRoute, { prefix: '/product' });
}
