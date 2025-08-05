/*
  Warnings:

  - The values [DELIVERED] on the enum `order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('WAITING', 'RECEIVED', 'IN_PROGRESS', 'DONE', 'FINISHED', 'CANCELED') NOT NULL DEFAULT 'WAITING';
