-- DropForeignKey
ALTER TABLE `Transactions` DROP FOREIGN KEY `Transactions_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `Transactions` DROP FOREIGN KEY `Transactions_accountTo_fkey`;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`accountId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountTo_fkey` FOREIGN KEY (`accountTo`) REFERENCES `Account`(`accountId`) ON DELETE CASCADE ON UPDATE CASCADE;
