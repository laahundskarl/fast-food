import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrderTable1748352157919 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order',
                columns: [
                    {
                        name: 'id',
                        type: 'char(36)',
                        isPrimary: true,
                        default: '(uuid())',
                    },
                    {
                        name: 'client_id',
                        type: 'char(36)',
                        isNullable: false,
                    },
                    {
                        name: 'value',
                        type: 'numeric',
                        isNullable: true,
                    },
                    {
                        name: 'order_number',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['aguardando', 'em preparação', 'pronto'],
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                columnNames: ['client_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'client',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order');
    }
}
