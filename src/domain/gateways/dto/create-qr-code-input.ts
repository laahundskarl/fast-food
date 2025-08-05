import { OrderProduct } from '#/domain/entities/order-product.entity';

export interface CreateQrCodeInput {
    paymentId: string;
    items: OrderProduct[];
    amount: number;
}
