import { IClient } from '#/domain/entities/client.entity';

export interface IClientOrchestration {
    getClientIfExists(clientId: string): Promise<IClient | undefined>;
}
