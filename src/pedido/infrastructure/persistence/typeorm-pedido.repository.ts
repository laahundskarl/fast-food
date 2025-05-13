import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../../core/domain/entities/pedido.entity';
import { PedidoRepository } from '../../core/domain/repositories/pedido.repository';

@Injectable()
export class TypeormPedidoRepository implements PedidoRepository {
  constructor(
    @InjectRepository(Pedido)
    private readonly repo: Repository<Pedido>,
  ) {}

  async criar(pedido: Pedido): Promise<Pedido> {
    return this.repo.save(pedido);
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    return this.repo.findOne({ where: { id } });
  }

  async listar(): Promise<Pedido[]> {
    return this.repo.find();
  }
}
