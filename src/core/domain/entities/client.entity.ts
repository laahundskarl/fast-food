import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';

import { Order } from '#/core/domain/entities/order.entity';

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'public_id', type: 'varchar' })
    publicId!: string;

    @Column('varchar')
    name!: string;

    @Column('varchar')
    cpf!: string;

    @Column({ nullable: true, type: 'varchar' })
    email?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @OneToMany(() => Order, order => order.client)
    orders!: Order[];
}
