import { IClient } from '#/domain/entities/client.entity';
import { ClientPresenterOutput, ClientWithOrdersPresenterOutput } from '#/interfaces/presenter/client.presenter';

export interface IClientPresenter {
    createClientPresenter(client: IClient): ClientPresenterOutput;
    findClientsPresenter(clients: IClient[]): ClientPresenterOutput[];
    getClientPresenter(client: IClient): ClientWithOrdersPresenterOutput;
}
