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
import { Product } from '#/core/domain/entities/product.entity';

@Entity('order_product')
export class OrderProduct {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'order_id', type: 'char' })
    orderId!: string;

    @Column({ name: 'product_id', type: 'char' })
    productId!: string;

    @Column('numeric', { nullable: true })
    amount?: number;

    @Column('numeric', { nullable: true })
    value?: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @ManyToOne(() => Order, order => order.orderProducts)
    @JoinColumn({ name: 'order_id' })
    order!: Order;

    @ManyToOne(() => Product, product => product.orderProducts)
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}
