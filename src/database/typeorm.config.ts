import { DataSource } from 'typeorm';

import { env } from '#/config/env';
import { Client } from '#/core/domain/entities/client.entity';
import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Order } from '#/core/domain/entities/order.entity';
import { Payment } from '#/core/domain/entities/payment.entity';
import { ProductCategory } from '#/core/domain/entities/product-category.entity';
import { Product } from '#/core/domain/entities/product.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASS,
    database: env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [Client, OrderProduct, Order, Payment, ProductCategory, Product],
});
