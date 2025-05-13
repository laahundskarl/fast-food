import { Pedido } from "../../core/domain/entities/pedido.entity";
import { PedidoRepository } from "../../core/domain/repositories/pedido.repository";

export class InMemoryPedidoRepository implements PedidoRepository {
  private pedidos: Pedido[] = [];

  async criar(pedido: Pedido): Promise<Pedido> {
    this.pedidos.push(pedido);
    return pedido;
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    return this.pedidos.find(p => p.id === id) || null;
  }

  async listar(): Promise<Pedido[]> {
    return this.pedidos;
  }
}
