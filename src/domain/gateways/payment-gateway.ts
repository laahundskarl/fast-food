import { CreateQrCodeInput } from '#/domain/gateways/dto/create-qr-code-input';

export interface IPaymentGateway {
    execute(request: CreateQrCodeInput): Promise<any>;
}
