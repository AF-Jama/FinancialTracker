/*
  Warnings:

  - You are about to alter the column `accountLimit` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `accountLimit` INTEGER NOT NULL;
