-- DropForeignKey
ALTER TABLE "security"."User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "security"."User" ALTER COLUMN "roleId" DROP NOT NULL,
ALTER COLUMN "roleId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "security"."User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "security"."Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
