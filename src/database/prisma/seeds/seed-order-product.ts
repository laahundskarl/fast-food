import { PrismaClient } from '@prisma/client';

export async function seedOrderProduct(prismaClient: PrismaClient) {
    const order = await prismaClient.order.findMany();
    const product = await prismaClient.product.findMany();

    await Promise.all([
        prismaClient.orderProduct.create({
            data: {
                orderId: order[0].id,
                amount: 1,
                value: product[0].value,
                productId: product[0].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[1].id,
                amount: 2,
                value: product[1].value * 2,
                productId: product[1].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[2].id,
                amount: 3,
                value: product[2].value * 3,
                productId: product[2].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[3].id,
                amount: 1,
                value: product[3].value,
                productId: product[3].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[3].id,
                amount: 1,
                value: product[3].value,
                productId: product[3].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[4].id,
                amount: 1,
                value: product[4].value,
                productId: product[4].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[4].id,
                amount: 3,
                value: product[4].value * 3,
                productId: product[4].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[4].id,
                amount: 1,
                value: product[4].value,
                productId: product[4].id,
            },
        }),
        prismaClient.orderProduct.create({
            data: {
                orderId: order[5].id,
                amount: 10,
                value: product[5].value * 10,
                productId: product[5].id,
            },
        }),
    ]);
}
