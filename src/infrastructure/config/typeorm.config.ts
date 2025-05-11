import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'admin',
  password: 'admin123',
  database: 'fastfood',
  autoLoadEntities: true,
  synchronize: true,
};
