import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { Order } from '#/core/domain/entities/order.entity';

export enum StatusPayment {
    PENDENTE = 'pendente',
    PROCESSANDO = 'processando',
    APROVADO = 'aprovado',
    RECUSADO = 'recusado',
}

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'order_id' })
    orderId!: string;

    @Column({ type: 'enum', enum: StatusPayment, nullable: true })
    status?: StatusPayment;

    @Column({ name: 'external_reference', nullable: true })
    externalReference?: string;

    @Column({ name: 'qr_code', type: 'text', nullable: true })
    qrCode?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @ManyToOne(() => Order, order => order.payments)
    @JoinColumn({ name: 'order_id' })
    order!: Order;
}
