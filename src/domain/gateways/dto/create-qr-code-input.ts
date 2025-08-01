import { OrderProduct } from '#/domain/entities/order-product.entity';

export interface CreateQrCodeInput {
    orderId: string;
    items: OrderProduct[];
    amount: number;
}
