import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';

export interface OrderResponseDTO {
    id: string;
    value: number;
    orderNumber: number;
    status: string;
    orderProducts: OrderProductResponseDTO[];
    payments: PaymentResponseDTO[];
    client?: ClientResponseDTO;
}

export interface OrderProductResponseDTO {
    id: string;
    amount: number;
    value: number;
    product: ProductResponseDTO;
}
