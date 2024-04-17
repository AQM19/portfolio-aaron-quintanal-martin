-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "configuration";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "projects";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "security";

-- CreateEnum
CREATE TYPE "security"."Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "configuration"."Status" AS ENUM ('investigation', 'planification', 'designing', 'developping', 'deploying', 'manteinance', 'finished');

-- CreateEnum
CREATE TYPE "projects"."Tag" AS ENUM ('humor', 'terror', 'gaming', 'tools');

-- CreateTable
CREATE TABLE "projects"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Developer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "github" TEXT,
    "portfoil" TEXT,
    "projectId" TEXT,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects"."ProjectImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects"."Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" TIMESTAMP(3),
    "documentation" TEXT,
    "link" TEXT,
    "status" "configuration"."Status" NOT NULL DEFAULT 'investigation',
    "slug" TEXT NOT NULL,
    "tags" "projects"."Tag"[] DEFAULT ARRAY[]::"projects"."Tag"[],
    "categoryId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "security"."Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "projects"."Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "projects"."Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_link_key" ON "projects"."Project"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "projects"."Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "security"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Developer" ADD CONSTRAINT "Developer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects"."ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects"."Project" ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "projects"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
