import { OrderResponseDTO } from '#/interfaces/presenter/order/order-response.dto';

export interface ClientResponseDTO {
    id: string;
    name: string;
    cpf: string;
    email: string;
    orders?: OrderResponseDTO[];
}
