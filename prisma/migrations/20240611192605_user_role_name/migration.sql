/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "security"."User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "security"."User" DROP COLUMN "roleId",
ADD COLUMN     "role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "security"."User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "security"."Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
