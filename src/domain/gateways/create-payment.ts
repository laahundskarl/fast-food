import { CreateQrCodeInput } from '#/domain/gateways/dto/create-qr-code-input';
import { QrCodeOutput } from '#/domain/gateways/dto/qr-code-output';

export interface ICreatePayment {
    execute(request: CreateQrCodeInput): Promise<QrCodeOutput>;
}
