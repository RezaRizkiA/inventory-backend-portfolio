/*
  Warnings:

  - You are about to drop the column `creadedAt` on the `AutomationLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AutomationLog" DROP COLUMN "creadedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
