import { Pedido, PedidoItem } from '../../domain/entities/pedido.entity';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { randomUUID } from 'crypto';

interface CriarPedidoDTO {
  clienteId: string;
  itens: { produtoId: string; quantidade: number }[];
}

export class CriarPedidoUseCase {
  constructor(private readonly pedidoRepo: PedidoRepository) {}

  async execute(dto: CriarPedidoDTO): Promise<Pedido> {
    const pedido = new Pedido(
      randomUUID(),
      dto.clienteId,
      dto.itens.map(i => new PedidoItem(i.produtoId, i.quantidade))
    );

    return this.pedidoRepo.criar(pedido);
  }
}
