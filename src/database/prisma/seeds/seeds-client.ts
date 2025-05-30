import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedClient() {
    await prisma.client.createMany({
        data: [
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                public_id: '123',
                cpf: '12345678901',
            },
            {
                name: 'Maria da Silva',
                email: 'maria@gmail.com',
                public_id: '1234',
                cpf: '12345678902',
            },
            {
                name: 'Pedro da Silva',
                email: 'pedro@gmail.com',
                public_id: '1235',
                cpf: '12345678903',
            },
            {
                name: 'Ana da Silva',
                email: 'ana@gmail.com',
                public_id: '1213',
                cpf: '12345678904',
            },
            {
                name: 'Carlos da Silva',
                email: 'carlos@gmail.com',
                public_id: '1233',
                cpf: '12345678905',
            },
            {
                name: 'João da Silva',
                email: 'joao@gmail.com',
                public_id: '1243',
                cpf: '12345678906',
            },
            {
                name: 'Junior dos Santos',
                email: 'junior@gmail.com',
                public_id: '1293',
                cpf: '12345678907',
            },
            {
                name: 'João Junior',
                email: 'joaojunior@gmail.com',
                public_id: '12223',
                cpf: '12345678908',
            },
        ],
        skipDuplicates: true,
    });
}
