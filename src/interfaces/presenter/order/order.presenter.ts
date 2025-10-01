import { IOrder } from '#/domain/entities/order.entity';
import { OrderResponseDTO } from '#/interfaces/presenter/order/order-response.dto';

export class OrderPresenter {
    static toDTO(order: IOrder): OrderResponseDTO {
        return {
            id: order.id,
            value: order.value,
            orderNumber: order.orderNumber,
            status: order.status,
            orderProducts: order.orderProducts.map(op => ({
                id: op.id,
                amount: op.amount,
                value: op.value,
                product: {
                    id: op.product.id,
                    name: op.product.name,
                    value: op.product.value,
                    description: op.product.description ?? null,
                    category: {
                        id: op.product.category.id,
                        name: op.product.category.name,
                    },
                },
            })),
            ...(order.payments && {
                payments: order.payments.map(p => ({
                    id: p.id,
                    status: p.status,
                    externalReference: p.externalReference ?? null,
                    qrCode: p.qrCode ?? null,
                })),
            }),
            ...(order.client && {
                client: {
                    id: order.client.id,
                    name: order.client.name,
                    cpf: order.client.cpf,
                    email: order.client.email,
                },
            }),
        };
    }
}
