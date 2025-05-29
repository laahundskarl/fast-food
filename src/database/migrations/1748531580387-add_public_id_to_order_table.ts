import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPublicIdToOrderTable1748531580387 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `fast-food`.order ADD COLUMN `public_id` int NOT NULL AUTO_INCREMENT, ADD INDEX `IDX_ORDER_PUBLIC_ID` (`public_id`);',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `fast-food`.order DROP COLUMN `public_id`;');
    }
}
