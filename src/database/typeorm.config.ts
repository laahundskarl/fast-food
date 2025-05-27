import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';
const isDevEnv = process.env.NODE_ENV === 'dev';

const shouldSeedDb = isTestEnv || isDevEnv;
console.log(process.env);

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    // synchronize: true,
    logging: false,
    entities: [__dirname + '/../core/domain/entities/*.entity.{js,ts}'],
    migrationsTableName: 'migrations_fast_food',
    migrations: [__dirname + '/migrations/*.{js,ts}', ...(!shouldSeedDb ? [] : [__dirname + '/seeds/*.{js,ts}'])],
});
