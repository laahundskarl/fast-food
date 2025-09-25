import { IOrderProduct } from '#/domain/entities/order-product.entity';
import { IOrder } from '#/domain/entities/order.entity';
import { IPayment } from '#/domain/entities/payment.entity';

export type OrderPresenterOutput = {
    id: string;
    value: number;
    orderNumber: number;
    status: string;
    clientId: string;
};

export type OrderProductPresenterOutput = {
    id: string;
    amount: number;
    value: number;
    productId: string;
    productName?: string;
};

export type OrderWithDetailsPresenterOutput = OrderPresenterOutput & {
    orderProducts: OrderProductPresenterOutput[];
    payments: Array<{
        id: string;
        status: string;
    }>;
};

export class OrderPresenter {
    static createOrderPresenter(order: IOrder): OrderPresenterOutput {
        return {
            id: order.id,
            value: order.value,
            orderNumber: order.orderNumber,
            status: order.status,
            clientId: order.client!.id,
        };
    }

    static findOrdersPresenter(orders: IOrder[]): OrderPresenterOutput[] {
        return orders.map(order => this.getOrderPresenter(order));
    }

    static getOrderPresenter(order: IOrder): OrderWithDetailsPresenterOutput {
        const basePresentation = this.createOrderPresenter(order);

        return {
            ...basePresentation,
            orderProducts: (order.orderProducts || []).map((orderProduct: IOrderProduct) => ({
                id: orderProduct.id,
                amount: orderProduct.amount,
                value: orderProduct.value,
                productId: orderProduct.product.id,
                productName: orderProduct.product.name,
            })),
            payments: (order.payments || []).map((payment: IPayment) => ({
                id: payment.id,
                status: payment.status,
            })),
        };
    }
}
