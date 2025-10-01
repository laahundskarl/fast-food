import { IdentifyDto } from '#/application/use-cases/identify/identify.dto';
import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';

export interface IIdentifyController {
    get(request: IdentifyDto): Promise<ClientResponseDTO>;
}
