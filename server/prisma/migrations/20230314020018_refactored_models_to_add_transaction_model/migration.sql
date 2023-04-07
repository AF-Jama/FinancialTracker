-- CreateTable
CREATE TABLE `Transactions` (
    `transactionId` VARCHAR(191) NOT NULL,
    `transactionType` ENUM('Withdrawal', 'Deposit', 'Transfer') NOT NULL,
    `description` VARCHAR(191) NULL,
    `accountTo` VARCHAR(191) NOT NULL,
    `AccountId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_AccountId_fkey` FOREIGN KEY (`AccountId`) REFERENCES `Account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_accountTo_fkey` FOREIGN KEY (`accountTo`) REFERENCES `Account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
