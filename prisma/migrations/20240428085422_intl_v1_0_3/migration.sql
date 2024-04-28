/*
  Warnings:

  - A unique constraint covering the columns `[locale]` on the table `Locales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Locales_locale_key" ON "configuration"."Locales"("locale");
