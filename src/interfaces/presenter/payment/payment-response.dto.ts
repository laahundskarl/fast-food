import { OrderResponseDTO } from '#/interfaces/presenter/order/order-response.dto';

export interface PaymentResponseDTO {
    id: string;
    status: string;
    externalReference: string | null;
    qrCode: string | null;
    order?: OrderResponseDTO;
}
