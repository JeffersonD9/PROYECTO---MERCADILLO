/*
  Warnings:

  - Added the required column `Telefono` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `Telefono` VARCHAR(191) NOT NULL;
