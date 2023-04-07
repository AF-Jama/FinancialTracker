-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_accountTo_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `accountTo` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountTo_fkey` FOREIGN KEY (`accountTo`) REFERENCES `Account`(`accountId`) ON DELETE SET NULL ON UPDATE CASCADE;
