import { IClient } from '#/domain/entities/client.entity';
import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';

export class ClientPresenter {
    static toDTO(client: IClient): ClientResponseDTO {
        return {
            id: client.id,
            name: client.name,
            cpf: client.cpf,
            email: client.email,
        };
    }
}
