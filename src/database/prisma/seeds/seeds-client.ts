import { PrismaClient } from '@prisma/client';

export async function seedClient(prismaClient: PrismaClient) {
    await prismaClient.client.createMany({
        data: [
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                cpf: '12345678901',
                publicId: '12345678901',
            },
            {
                name: 'Maria da Silva',
                email: 'maria@gmail.com',
                cpf: '12345678902',
                publicId: '12345678902',
            },
            {
                name: 'Pedro da Silva',
                email: 'pedro@gmail.com',
                publicId: '12345678903',
                cpf: '12345678903',
            },
            {
                name: 'Ana da Silva',
                publicId: '12345678904',
                email: 'ana@gmail.com',
                cpf: '12345678904',
            },
            {
                name: 'Carlos da Silva',
                email: 'carlos@gmail.com',
                publicId: '12345678905',
                cpf: '12345678905',
            },
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                publicId: '12345678906',
                cpf: '12345678906',
            },
            {
                name: 'Junior dos Santos',
                publicId: '12345678907',
                email: 'junior@gmail.com',
                cpf: '12345678907',
            },
            {
                name: 'João Junior',
                email: 'joaojunior@gmail.com',
                cpf: '12345678908',
                publicId: '12345678908',
            },
        ],
        skipDuplicates: true,
    });
}
