/*
  Warnings:

  - You are about to drop the column `Nombre` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `Nombres` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `Nombre`,
    ADD COLUMN `Apellidos` VARCHAR(191) NULL,
    ADD COLUMN `Nombres` VARCHAR(191) NOT NULL;
