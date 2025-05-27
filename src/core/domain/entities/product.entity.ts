import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { OrderProduct } from '#/core/domain/entities/order-product.entity';
import { ProductCategory } from '#/core/domain/entities/product-category.entity';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    name!: string;

    @Column('numeric')
    value!: number;

    @Column({ length: 500, type: 'varchar', nullable: true })
    description?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
    @JoinColumn({ name: 'category_id' })
    category!: ProductCategory;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts!: OrderProduct[];
}
