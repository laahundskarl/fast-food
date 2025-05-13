import { Pedido } from '../entities/pedido.entity';

export interface PedidoRepository {
  criar(pedido: Pedido): Promise<Pedido>;
  buscarPorId(id: string): Promise<Pedido | null>;
  listar(): Promise<Pedido[]>;
}
