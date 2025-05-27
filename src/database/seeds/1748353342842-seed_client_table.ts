import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedClientTable1748353342842 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'João da Silva', 'joao@gmail.com', NOW(), NOW(), NULL, '123', '12345678901');`,
        );
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'Maria da Silva', 'maria@gmail.com', NOW(), NOW(), NULL, '1234', '12345678902');`,
        );
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'Pedro da Silva', 'pedro@gmail.com', NOW(), NOW(), NULL, '1235', '12345678903');`,
        );
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'Ana da Silva', 'ana@gmail.com', NOW(), NOW(), NULL, '1213', '12345678904');`,
        );
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'Carlos da Silva', 'carlos@gmail.com', NOW(), NOW(), NULL, '1233', '12345678905');`,
        );
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'João da Silva', 'joao@gmail.com', NOW(), NOW(), NULL, '1243', '12345678906');`,
        );
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'Junior dos Santos', 'junior@gmail.com', NOW(), NOW(), NULL, '1293', '12345678907');`,
        );
        await queryRunner.query(
            `INSERT INTO client (id, name, email, created_at, updated_at, deleted_at, public_id, cpf) VALUES (UUID(), 'João Junior', 'joaojunior@gmail.com', NOW(), NOW(), NULL, '12223', '12345678908');`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM client;`);
    }
}
