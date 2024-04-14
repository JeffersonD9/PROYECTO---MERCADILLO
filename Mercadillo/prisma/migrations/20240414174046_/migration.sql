/*
  Warnings:

  - You are about to drop the column `Nombre` on the `admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `Nombre`,
    ADD COLUMN `Email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_Email_key` ON `Admin`(`Email`);
