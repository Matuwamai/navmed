-- AlterTable
ALTER TABLE `Order` ADD COLUMN `status` ENUM('PENDING', 'CONFIRMED') NOT NULL DEFAULT 'PENDING';
