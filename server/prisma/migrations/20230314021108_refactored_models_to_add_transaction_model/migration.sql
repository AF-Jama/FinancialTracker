/*
  Warnings:

  - You are about to drop the column `AccountId` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_AccountId_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `AccountId`,
    ADD COLUMN `accountId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
