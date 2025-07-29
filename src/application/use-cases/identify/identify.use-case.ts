import { IdentifyDto } from '#/application/use-cases/identify/identify.dto';
import { Client } from '#/domain/entities/client.entity';

export interface IIdentifyUseCase {
    execute(request: IdentifyDto): Promise<Client>;
}
