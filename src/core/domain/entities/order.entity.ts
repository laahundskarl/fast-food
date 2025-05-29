import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

import { Client } from '#/core/domain/entities/client.entity';
import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { Payment } from '#/core/domain/entities/payment.entity';

export enum OrderStatus {
    RECEBIDO = 'aguardando',
    EM_PREPARACAO = 'em preparação',
    PRONTO = 'pronto',
}

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'public_id', type: 'int' })
    publicId!: number;

    @Column({ name: 'client_id', type: 'char', length: 36, nullable: true })
    clientId!: string;

    @Column({ type: 'int', nullable: true })
    value?: number;

    @Column({ name: 'order_number', type: 'int' })
    orderNumber!: number;

    @Column({ type: 'enum', enum: OrderStatus })
    status!: OrderStatus;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @ManyToOne(() => Client, client => client.orders)
    @JoinColumn({ name: 'client_id' })
    client!: Client;

    @OneToMany(() => OrderProduct, op => op.order)
    orderProducts!: OrderProduct[];

    @OneToMany(() => Payment, payment => payment.order)
    payments!: Payment[];
}
