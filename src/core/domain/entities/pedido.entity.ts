import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoItem } from './pedido-item.entity';

export enum StatusPedido {
  RECEBIDO = 'RECEBIDO',
  EM_PREPARACAO = 'EM_PREPARACAO',
  PRONTO = 'PRONTO',
  FINALIZADO = 'FINALIZADO',
}

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clienteId: string;

  @Column({ type: 'enum', enum: StatusPedido })
  status: StatusPedido;

  @OneToMany(() => PedidoItem, item => item.pedido, { cascade: true, eager: true })
  itens: PedidoItem[];
}
