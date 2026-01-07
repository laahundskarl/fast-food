import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seeds...');

    const clients = await prisma.client.createMany({
        data: [
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                cpf: '72935552024',
            },
            {
                name: 'Maria da Silva',
                email: 'maria@gmail.com',
                cpf: '84935708000',
            },
            {
                name: 'Pedro da Silva',
                email: 'pedro@gmail.com',
                cpf: '80302935002',
            },
        ],
        skipDuplicates: true,
    });
    console.log(`✅ Created ${clients.count} clients`);

    const categories = await prisma.productCategory.createMany({
        data: [
            {
                name: 'Sobremesa',
            },
            {
                name: 'Bebida',
            },
            {
                name: 'Pizza',
            },
            {
                name: 'Hambúrguer',
            },
        ],
        skipDuplicates: true,
    });
    console.log(`✅ Created ${categories.count} product categories`);

    const productCategory = await prisma.productCategory.findMany();
    const products = await Promise.all([
        prisma.product.create({
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
        prisma.product.create({
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
        prisma.product.create({
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
        prisma.product.create({
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
        prisma.product.create({
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
    console.log(`✅ Created ${products.length} products`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log('🎉 Seed completed!');
    })
    .catch(async error => {
        console.error('❌ Seed failed:', error);
        await prisma.$disconnect();
        process.exit(1);
    });
