import { IClient } from '#/domain/entities/client.entity';
import { OrderPresenter, OrderPresenterOutput } from '#/interfaces/presenter/order.presenter';

export type ClientPresenterOutput = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    orders?: OrderPresenterOutput[];
};

export type ClientWithOrdersPresenterOutput = ClientPresenterOutput & {
    orders: Array<{
        id: string;
        orderNumber: number;
        value: number;
        status: string;
    }>;
};

export class ClientPresenter {
    static createClientPresenter(client: IClient): ClientPresenterOutput {
        return {
            id: client.id,
            name: client.name,
            cpf: client.cpf,
            email: client.email,
        };
    }

    static findClientsPresenter(clients: IClient[]): ClientPresenterOutput[] {
        return clients.map(client => this.createClientPresenter(client));
    }

    static getClientPresenter(client: IClient): ClientWithOrdersPresenterOutput {
        const basePresentation = this.createClientPresenter(client);

        return {
            ...basePresentation,
            orders: OrderPresenter.findOrdersPresenter(client.orders || []),
        };
    }
}
