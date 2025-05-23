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

    @Column({ name: 'public_id', type: 'char', length: 36 })
    publicId!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    cpf!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @OneToMany(() => Order, order => order.client)
    orders!: Order[];
}
