/*
  Warnings:

  - Added the required column `transactionAmount` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `transactionAmount` BIGINT NOT NULL;
