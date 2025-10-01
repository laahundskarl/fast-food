import { IClient } from '#/domain/entities/client.entity';
import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';

export class ClientPresenter {
    static toDTO(client: IClient): ClientResponseDTO {
        return {
            id: client.id,
            name: client.name,
            cpf: client.cpf,
            email: client.email,
            ...(client.orders && {
                orders: client.orders?.map(order => ({
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
                    payments: order.payments.map(p => ({
                        id: p.id,
                        status: p.status,
                        externalReference: p.externalReference ?? null,
                        qrCode: p.qrCode ?? null,
                    })),
                })),
            }),
        };
    }
}
