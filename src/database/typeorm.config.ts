import { DataSource } from 'typeorm';

import { env } from '#/config/env';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASS,
    database: env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [],
});
