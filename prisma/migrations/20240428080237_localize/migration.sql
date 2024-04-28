/*
  Warnings:

  - You are about to drop the column `name` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `documentation` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nemonic]` on the table `Status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nemonic]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nemonic]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nemonic` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nemonic` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nemonic` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "configuration"."Status_name_key";

-- DropIndex
DROP INDEX "projects"."Category_name_key";

-- DropIndex
DROP INDEX "projects"."Tag_name_key";

-- AlterTable
ALTER TABLE "configuration"."Status" DROP COLUMN "name",
ADD COLUMN     "nemonic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects"."Category" DROP COLUMN "name",
ADD COLUMN     "nemonic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects"."Project" DROP COLUMN "description",
DROP COLUMN "documentation";

-- AlterTable
ALTER TABLE "projects"."Tag" DROP COLUMN "name",
ADD COLUMN     "nemonic" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "projects"."ProjectDescription" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "ProjectDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects"."ShortProjectDescription" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "ShortProjectDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects"."ProjectDocumentation" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,
    "file" BYTEA NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "ProjectDocumentation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_nemonic_key" ON "configuration"."Status"("nemonic");

-- CreateIndex
CREATE UNIQUE INDEX "Category_nemonic_key" ON "projects"."Category"("nemonic");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nemonic_key" ON "projects"."Tag"("nemonic");

-- AddForeignKey
ALTER TABLE "projects"."ProjectDescription" ADD CONSTRAINT "ProjectDescription_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects"."ShortProjectDescription" ADD CONSTRAINT "ShortProjectDescription_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects"."ProjectDocumentation" ADD CONSTRAINT "ProjectDocumentation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
