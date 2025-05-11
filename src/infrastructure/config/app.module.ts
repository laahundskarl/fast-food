import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { Pedido } from '../../domain/entities/pedido.entity';
import { PedidoItem } from '../../domain/entities/pedido-item.entity';
import { TypeormPedidoRepository } from '../persistence/typeorm-pedido.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Pedido, PedidoItem]),
  ],
  providers: [
    {
      provide: 'PedidoRepository',
      useClass: TypeormPedidoRepository,
    },
  ],
})
export class AppModule {}
