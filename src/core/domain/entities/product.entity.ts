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

    @Column({ name: 'product_category_id', type: 'char', length: 36, nullable: true })
    productCategoryId!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'int' })
    value!: number;

    @Column({ type: 'varchar', length: 500, nullable: true })
    description?: string;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
    @JoinColumn({ name: 'category_id' })
    category!: ProductCategory;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts!: OrderProduct[];
}
