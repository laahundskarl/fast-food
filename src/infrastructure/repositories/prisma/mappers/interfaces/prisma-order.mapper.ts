import { Order as PrismaOrder } from '@prisma/client';

import { IOrder } from '#/domain/entities/order.entity';

export interface IPrismaOrderMapper {
    toCreate(order: IOrder): Omit<PrismaOrder, 'createdAt' | 'updatedAt'>;
    toUpdateOrderProducts(order: IOrder): Omit<PrismaOrder, 'createdAt' | 'updatedAt'>;
    toDomain(
        order: PrismaOrder & {
            client?: any;
            orderProducts?: any[];
            payments?: any[];
        },
    ): IOrder;
}
