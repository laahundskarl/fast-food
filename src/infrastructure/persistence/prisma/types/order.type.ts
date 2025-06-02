import { Order, OrderProduct, Payment, Product } from '@prisma/client';

export type OrderWithRelations = Order & {
    payments: Payment[];
    orderProducts: (OrderProduct & {
        product: Product;
    })[];
};
