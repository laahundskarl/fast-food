/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `order_product` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `product_category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `client` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `order_product` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `product_category` DROP COLUMN `deleted_at`;
