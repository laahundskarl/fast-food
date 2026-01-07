import { Client } from '#/domain/entities/client.entity';
import { ClientResponse } from '#/interfaces/http/schemas/client/client-response.schema';
import { DeleteResponse } from '#/interfaces/http/schemas/common/util.schema';

export class ClientPresenter {
    static toHTTP(client: Client): ClientResponse {
        return {
            id: client.id,
            name: client.name,
            cpf: client.cpf,
            email: client.email,
        };
    }

    static toDeleteResponse(): DeleteResponse {
        return { message: 'Client deleted successfully' };
    }
}
