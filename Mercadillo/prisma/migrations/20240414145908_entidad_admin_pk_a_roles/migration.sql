/*
  Warnings:

  - You are about to drop the column `idRol` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `id_Rol` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_idRol_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `idRol`,
    ADD COLUMN `id_Rol` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `id_Rol` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_Rol_fkey` FOREIGN KEY (`id_Rol`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_id_Rol_fkey` FOREIGN KEY (`id_Rol`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
