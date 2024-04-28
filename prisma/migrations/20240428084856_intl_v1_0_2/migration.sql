/*
  Warnings:

  - You are about to drop the column `locale` on the `ProjectDescription` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `ProjectDocumentation` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `ShortProjectDescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects"."ProjectDescription" DROP COLUMN "locale",
ADD COLUMN     "localesId" INTEGER;

-- AlterTable
ALTER TABLE "projects"."ProjectDocumentation" DROP COLUMN "locale",
ADD COLUMN     "localesId" INTEGER;

-- AlterTable
ALTER TABLE "projects"."ShortProjectDescription" DROP COLUMN "locale",
ADD COLUMN     "localesId" INTEGER;

-- CreateTable
CREATE TABLE "configuration"."Locales" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,

    CONSTRAINT "Locales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects"."ProjectDescription" ADD CONSTRAINT "ProjectDescription_localesId_fkey" FOREIGN KEY ("localesId") REFERENCES "configuration"."Locales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects"."ShortProjectDescription" ADD CONSTRAINT "ShortProjectDescription_localesId_fkey" FOREIGN KEY ("localesId") REFERENCES "configuration"."Locales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects"."ProjectDocumentation" ADD CONSTRAINT "ProjectDocumentation_localesId_fkey" FOREIGN KEY ("localesId") REFERENCES "configuration"."Locales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
