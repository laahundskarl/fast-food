import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class PedidoItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  produtoId: string;

  @Column()
  quantidade: number;

  @ManyToOne(() => Pedido, pedido => pedido.itens)
  pedido: Pedido;

  constructor(produtoId: string, quantidade: number) {
    this.produtoId = produtoId;
    this.quantidade = quantidade;
  }
}
