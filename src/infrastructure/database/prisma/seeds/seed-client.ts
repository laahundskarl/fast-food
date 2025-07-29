import { PrismaClient } from '@prisma/client';

export async function seedClient(prismaClient: PrismaClient) {
    await prismaClient.client.createMany({
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
            {
                name: 'Ana da Silva',
                email: 'ana@gmail.com',
                cpf: '50617087091',
            },
            {
                name: 'Carlos da Silva',
                email: 'carlos@gmail.com',
                cpf: '65148203013',
            },
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                cpf: '29909177056',
            },
            {
                name: 'Junior dos Santos',
                email: 'junior@gmail.com',
                cpf: '65148203013',
            },
            {
                name: 'João Junior',
                email: 'joaojunior@gmail.com',
                cpf: '21174264098',
            },
        ],
        skipDuplicates: true,
    });
}
