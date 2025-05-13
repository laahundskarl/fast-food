import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../../database/typeorm.config';
import { Pedido } from '../../core/domain/entities/pedido.entity';
import { PedidoItem } from '../../core/domain/entities/pedido-item.entity';
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
export class PedidoModule {}
