import { IdentifyDto } from '#/application/use-cases/identify/identify.dto';

export interface IIdentifyController {
    get(request: IdentifyDto): Promise<void>;
}
