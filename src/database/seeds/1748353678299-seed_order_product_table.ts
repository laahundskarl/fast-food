/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedOrderProductTable1748353678299 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 1), (select id from product where name = 'McChicken'));",
        );
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 1), (select id from product where name = 'Pizza calabresa'));",
        );
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 1), (select id from product where name = 'COca-cola'));",
        );
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 2), (select id from product where name = 'Pizza calabresa'));",
        );
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 3), (select id from product where name = 'Coca-cola'));",
        );
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 4), (select id from product where name = 'Sorvete'));",
        );
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 5), (select id from product where name = 'Sorvete'));",
        );
        await queryRunner.query(
            "INSERT INTO order_product (id, order_id, product_id) VALUES (UUID(), (select id from `fast-food`.order where order_number = 6), (select id from product where name = 'Sorvete'));",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM order_product;`);
    }
}
