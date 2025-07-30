export interface UpdateOrderDto {
    status?: string;
    orderProducts?: [
        {
            productId: string;
            quantity: number;
        },
    ];
}
