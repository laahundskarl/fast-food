import { Controller, Post, Body, Get } from '@nestjs/common';
import { CriarPedidoUseCase } from '../../../core/application/usecases/criar-pedido';
import { InMemoryPedidoRepository } from '../../persistence/in-memory-pedido.repository';

@Controller('pedidos')
export class PedidoService {
  private readonly useCase = new CriarPedidoUseCase(new InMemoryPedidoRepository());

  @Post()
  async criar(@Body() body: any) {
    return this.useCase.execute(body);
  }
}
