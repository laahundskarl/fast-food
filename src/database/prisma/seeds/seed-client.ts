import { PrismaClient } from '@prisma/client';

export async function seedClient(prismaClient: PrismaClient) {
    await prismaClient.client.createMany({
        data: [
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                cpf: '12345678901',
            },
            {
                name: 'Maria da Silva',
                email: 'maria@gmail.com',
                cpf: '12345678902',
            },
            {
                name: 'Pedro da Silva',
                email: 'pedro@gmail.com',
                cpf: '12345678903',
            },
            {
                name: 'Ana da Silva',
                email: 'ana@gmail.com',
                cpf: '12345678904',
            },
            {
                name: 'Carlos da Silva',
                email: 'carlos@gmail.com',
                cpf: '12345678905',
            },
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                cpf: '12345678906',
            },
            {
                name: 'Junior dos Santos',
                email: 'junior@gmail.com',
                cpf: '12345678907',
            },
            {
                name: 'João Junior',
                email: 'joaojunior@gmail.com',
                cpf: '12345678908',
            },
        ],
        skipDuplicates: true,
    });
}
