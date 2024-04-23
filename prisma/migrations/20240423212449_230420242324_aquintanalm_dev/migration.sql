-- DropForeignKey
ALTER TABLE "public"."Developer" DROP CONSTRAINT "Developer_projectId_fkey";

-- CreateTable
CREATE TABLE "projects"."DevelopersOnProject" (
    "projectId" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DevelopersOnProject_pkey" PRIMARY KEY ("projectId","developerId")
);

-- AddForeignKey
ALTER TABLE "projects"."DevelopersOnProject" ADD CONSTRAINT "DevelopersOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects"."DevelopersOnProject" ADD CONSTRAINT "DevelopersOnProject_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public"."Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
