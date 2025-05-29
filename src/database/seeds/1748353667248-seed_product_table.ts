import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProductTable1748353667248 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO product (id, name, value, category_id) VALUES (UUID(), 'McChicken', 10.00, (select id from product_category where name = 'Hambúrguer'));`,
        );
        await queryRunner.query(
            `INSERT INTO product (id, name, value, category_id) VALUES (UUID(), 'Pizza calabresa', 10.00, (select id from product_category where name = 'Pizza'));`,
        );
        await queryRunner.query(
            `INSERT INTO product (id, name, value, category_id) VALUES (UUID(), 'Coca-cola', 10.00, (select id from product_category where name = 'Bebida'));`,
        );
        await queryRunner.query(
            `INSERT INTO product (id, name, value, category_id) VALUES (UUID(), 'Sorvete', 10.00, (select id from product_category where name = 'Sobremesa'));`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM product;`);
    }
}
