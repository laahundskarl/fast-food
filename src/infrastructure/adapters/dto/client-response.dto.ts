import { Client } from '#/core/domain/entities/client.entity';

export class ClientResponseDto {
    id: string;
    publicId: string;
    name: string;
    cpf: string;
    email: string;

    constructor(client: Client) {
        this.id = client.id;
        this.publicId = client.publicId;
        this.name = client.name;
        this.cpf = client.cpf;
        this.email = client.email;
    }
}
