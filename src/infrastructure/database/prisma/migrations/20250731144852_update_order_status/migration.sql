/*
  Warnings:

  - The values [READY,CANCELED] on the enum `order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('WAITING', 'RECEIVED', 'DELIVERED', 'IN_PROGRESS', 'DONE', 'FINISHED') NOT NULL DEFAULT 'WAITING';
