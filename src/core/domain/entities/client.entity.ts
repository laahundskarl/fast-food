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
import { User } from '#/core/domain/entities/user.entity';

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'public_id', type: 'char', length: 36 })
    publicId!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 11 })
    cpf!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @OneToMany(() => Order, order => order.client)
    orders!: Order[];

    @OneToMany(() => User, user => user.client)
    users!: User[];
}
