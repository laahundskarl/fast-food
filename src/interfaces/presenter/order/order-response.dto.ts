import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';
import { PaymentResponseDTO } from '#/interfaces/presenter/payment/payment-response.dto';
import { ProductResponseDTO } from '#/interfaces/presenter/product/product-response.dto';

interface OrderProductResponseDTO {
    id: string;
    amount: number;
    value: number;
    product: ProductResponseDTO;
}

export interface OrderResponseDTO {
    id: string;
    value: number;
    orderNumber: number;
    status: string;
    orderProducts: OrderProductResponseDTO[];
    payments?: PaymentResponseDTO[];
    client?: ClientResponseDTO;
}
