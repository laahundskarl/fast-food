import { PrismaClient, StatusPayment } from '@prisma/client';

export async function seedPayment(prismaClient: PrismaClient) {
    const order = await prismaClient.order.findMany();

    await Promise.all([
        prismaClient.payment.create({
            data: {
                orderId: order[0].id,
                status: StatusPayment.REJECTED,
            },
        }),
        prismaClient.payment.create({
            data: {
                orderId: order[1].id,
                status: StatusPayment.APPROVED,
            },
        }),
        prismaClient.payment.create({
            data: {
                orderId: order[2].id,
                status: StatusPayment.APPROVED,
            },
        }),

        prismaClient.payment.create({
            data: {
                orderId: order[3].id,
                status: StatusPayment.APPROVED,
            },
        }),
        prismaClient.payment.create({
            data: {
                orderId: order[4].id,
                status: StatusPayment.PENDING,
            },
        }),
        prismaClient.payment.create({
            data: {
                orderId: order[5].id,
                status: StatusPayment.REJECTED,
            },
        }),
    ]);
}
