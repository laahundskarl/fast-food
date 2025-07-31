import { OrderStatus, PrismaClient } from '@prisma/client';

export async function seedOrder(prismaClient: PrismaClient) {
    const client = await prismaClient.client.findMany();

    await Promise.all([
        prismaClient.order.create({
            data: {
                clientId: client[0].id,
                status: OrderStatus.WAITING,
                value: 20,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[1].id,
                status: OrderStatus.IN_PROGRESS,
                value: 30,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[2].id,
                status: OrderStatus.DONE,
                value: 40,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[3].id,
                status: OrderStatus.DONE,
                value: 50,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[4].id,
                status: OrderStatus.WAITING,
                value: 60,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[5].id,
                status: OrderStatus.WAITING,
                value: 70,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[5].id,
                status: OrderStatus.RECEIVED,
                value: 70,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[5].id,
                status: OrderStatus.IN_PROGRESS,
                value: 70,
            },
        }),
        prismaClient.order.create({
            data: {
                clientId: client[5].id,
                status: OrderStatus.FINISHED,
                value: 70,
            },
        }),
    ]);
}
