-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `public_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `client_cpf_key`(`cpf`),
    UNIQUE INDEX `client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` VARCHAR(191) NOT NULL,
    `public_id` CHAR(36) NOT NULL,
    `client_id` CHAR(36) NULL,
    `value` INTEGER NULL,
    `order_number` INTEGER NOT NULL,
    `status` ENUM('WAITING', 'IN_PROGRESS', 'READY') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_product` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` CHAR(36) NOT NULL,
    `product_id` CHAR(36) NOT NULL,
    `amount` INTEGER NOT NULL,
    `value` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` CHAR(36) NOT NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'APPROVED', 'REJECTED') NULL,
    `external_reference` VARCHAR(100) NULL,
    `qr_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `value` INTEGER NOT NULL,
    `description` VARCHAR(500) NULL,
    `category_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_product` ADD CONSTRAINT `order_product_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_product` ADD CONSTRAINT `order_product_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `product_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
