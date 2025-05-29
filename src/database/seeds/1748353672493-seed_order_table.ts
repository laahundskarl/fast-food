/* eslint-disable quotes */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedOrderTable1748353672493 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO `fast-food`.order (id, client_id, value, order_number, status) VALUES (UUID(), (select id from client where public_id = '123'), 10.00, 1, 'aguardando');",
        );
        await queryRunner.query(
            "INSERT INTO `fast-food`.order (id, client_id, value, order_number, status) VALUES (UUID(), (select id from client where public_id = '1234'), 102.00, 2, 'aguardando');",
        );
        await queryRunner.query(
            "INSERT INTO `fast-food`.order (id, client_id, value, order_number, status) VALUES (UUID(), (select id from client where public_id = '1235'), 50.00, 3, 'aguardando');",
        );
        await queryRunner.query(
            "INSERT INTO `fast-food`.order (id, client_id, value, order_number, status) VALUES (UUID(), (select id from client where public_id = '1213'), 40.75, 4, 'em preparação');",
        );
        await queryRunner.query(
            "INSERT INTO `fast-food`.order (id, client_id, value, order_number, status) VALUES (UUID(), (select id from client where public_id = '1233'), 90.87, 5, 'pronto');",
        );
        await queryRunner.query(
            "INSERT INTO `fast-food`.order (id, client_id, value, order_number, status) VALUES (UUID(), (select id from client where public_id = '1243'), 25.64, 6, 'pronto');",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`fast-food\`.order;`);
    }
}
