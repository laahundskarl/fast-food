import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProductCategoryTable1748353640397 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO product_category (id, name) VALUES (UUID(), 'Hambúrguer');`);
        await queryRunner.query(`INSERT INTO product_category (id, name) VALUES (UUID(), 'Pizza');`);
        await queryRunner.query(`INSERT INTO product_category (id, name) VALUES (UUID(), 'Bebida');`);
        await queryRunner.query(`INSERT INTO product_category (id, name) VALUES (UUID(), 'Sobremesa');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM product_category;`);
    }
}
