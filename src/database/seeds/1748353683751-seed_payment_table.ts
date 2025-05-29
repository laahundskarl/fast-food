/* eslint-disable quotes */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPaymentTable1748353683751 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO payment (id, order_id, status, external_reference, qr_code) VALUES (UUID(), (select id from `fast-food`.order where order_number = 1), 'aprovado', '1A2C34', 'qr_code');",
        );
        await queryRunner.query(
            "INSERT INTO payment (id, order_id, status, external_reference, qr_code) VALUES (UUID(), (select id from `fast-food`.order where order_number = 2), 'aprovado', '1A2C3C', 'qr_code');",
        );
        await queryRunner.query(
            "INSERT INTO payment (id, order_id, status, external_reference, qr_code) VALUES (UUID(), (select id from `fast-food`.order where order_number = 3), 'aprovado', '1A2C3B', 'qr_code');",
        );
        await queryRunner.query(
            "INSERT INTO payment (id, order_id, status, external_reference, qr_code) VALUES (UUID(), (select id from `fast-food`.order where order_number = 4), 'processando', '1A2C3A', 'qr_code');",
        );
        await queryRunner.query(
            "INSERT INTO payment (id, order_id, status, external_reference, qr_code) VALUES (UUID(), (select id from `fast-food`.order where order_number = 5), 'pendente', '1A2C3Z', 'qr_code');",
        );
        await queryRunner.query(
            "INSERT INTO payment (id, order_id, status, external_reference, qr_code) VALUES (UUID(), (select id from `fast-food`.order where order_number = 6), 'recusado', '1A2C3Z', 'qr_code');",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM payment;`);
    }
}
