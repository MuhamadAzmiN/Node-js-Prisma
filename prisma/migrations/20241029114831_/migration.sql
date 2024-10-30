/*
  Warnings:

  - You are about to drop the column `city` on the `addresses` table. All the data in the column will be lost.
  - You are about to alter the column `street` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `city`,
    MODIFY `street` VARCHAR(100) NULL,
    MODIFY `country` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `contacts` MODIFY `phone` VARCHAR(10) NULL;
