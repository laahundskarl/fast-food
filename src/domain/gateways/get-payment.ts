export interface IGetPayment {
    execute(paymentId: string): Promise<string>;
}
