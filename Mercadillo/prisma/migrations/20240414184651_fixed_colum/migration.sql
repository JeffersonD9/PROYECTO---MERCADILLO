/*
  Warnings:

  - You are about to drop the column `in_Usuario` on the `productos` table. All the data in the column will be lost.
  - Added the required column `id_Usuario` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_in_Usuario_fkey`;

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `in_Usuario`,
    ADD COLUMN `id_Usuario` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_id_Usuario_fkey` FOREIGN KEY (`id_Usuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
