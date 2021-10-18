/*
  Warnings:

  - Added the required column `toId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "toId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "online" BOOLEAN DEFAULT false;
