import { PrismaClient } from '@prisma/client';

export async function seedProduct(prismaClient: PrismaClient) {
    const productCategory = await prismaClient.productCategory.findMany();
    await Promise.all([
        prismaClient.product.create({
            data: {
                name: 'Pizza de Calabresa',
                value: 30,
                description: 'Pizza de calabresa com cebola, azeitona e mussarela',
                category: {
                    connect: {
                        id: productCategory.find(category => category.name === 'Pizza')?.id,
                    },
                },
            },
        }),
        prismaClient.product.create({
            data: {
                name: 'Pizza de Mussarela',
                value: 25,
                description: 'Pizza de mussarela com cebola, azeitona e mussarela',
                category: {
                    connect: {
                        id: productCategory.find(category => category.name === 'Pizza')?.id,
                    },
                },
            },
        }),
        prismaClient.product.create({
            data: {
                name: 'Pizza de Calabresa',
                value: 20,
                description: 'Pizza de calabresa com cebola, azeitona e mussarela',
                category: {
                    connect: {
                        id: productCategory.find(category => category.name === 'Pizza')?.id,
                    },
                },
            },
        }),
        prismaClient.product.create({
            data: {
                name: 'Refrigerante',
                value: 10,
                description: 'Refrigerante de cola',
                category: {
                    connect: {
                        id: productCategory.find(category => category.name === 'Bebida')?.id,
                    },
                },
            },
        }),
        prismaClient.product.create({
            data: {
                name: 'Sorvete',
                value: 20,
                description: 'Sorvete de chocolate',
                category: {
                    connect: {
                        id: productCategory.find(category => category.name === 'Sobremesa')?.id,
                    },
                },
            },
        }),
        prismaClient.product.create({
            data: {
                name: 'Hamburguer',
                value: 20,
                description: 'Hamburguer de carne',
                category: {
                    connect: {
                        id: productCategory.find(category => category.name === 'Hambúrguer')?.id,
                    },
                },
            },
        }),
    ]);
}
