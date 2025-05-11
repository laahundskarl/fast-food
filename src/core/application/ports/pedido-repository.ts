import { Pedido } from '../../domain/entities/pedido.entity';

export abstract class StudentRepository {
  abstract save(pedido: Pedido): Promise<Pedido>;
}