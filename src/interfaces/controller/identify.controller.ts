import { inject, injectable } from 'inversify';

import { IdentifyDto } from '#/application/use-cases/identify/identify.dto';
import { IIdentifyUseCase } from '#/application/use-cases/identify/identify.use-case';
import { TYPES } from '#/infrastructure/config/di/types';
import { IIdentifyController } from '#/interfaces/controller/types/identify';
import { ClientResponseDTO } from '#/interfaces/presenter/client/client-response.dto';
import { ClientPresenter } from '#/interfaces/presenter/client/client.presenter';

@injectable()
export class IdentifyController implements IIdentifyController {
    constructor(@inject(TYPES.IdentifyUseCase) private readonly identifyUseCase: IIdentifyUseCase) {}

    async get(request: IdentifyDto): Promise<ClientResponseDTO> {
        const response = await this.identifyUseCase.execute(request);
        return ClientPresenter.toDTO(response);
    }
}
