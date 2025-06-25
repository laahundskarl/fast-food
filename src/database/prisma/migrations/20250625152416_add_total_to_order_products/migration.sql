/*
  Warnings:

  - You are about to alter the column `value` on the `order_product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `order_product` ADD COLUMN `total` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `value` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELED') NOT NULL DEFAULT 'PENDING';
