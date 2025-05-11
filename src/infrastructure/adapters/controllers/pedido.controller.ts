import { Controller, Post, Body, Get } from '@nestjs/common';
import { CriarPedidoUseCase } from '../../../application/use-cases/criar-pedido.usecase';
import { InMemoryPedidoRepository } from '../../persistence/in-memory-pedido.repository';

@Controller('pedidos')
export class PedidoController {
  private readonly useCase = new CriarPedidoUseCase(new InMemoryPedidoRepository());

  @Post()
  async criar(@Body() body: any) {
    return this.useCase.execute(body);
  }
}
