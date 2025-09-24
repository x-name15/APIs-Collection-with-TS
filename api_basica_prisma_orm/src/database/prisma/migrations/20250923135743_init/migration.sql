/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Genre` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_MovieGenres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `A` on the `_MovieGenres` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_MovieGenres` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."_MovieGenres" DROP CONSTRAINT "_MovieGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MovieGenres" DROP CONSTRAINT "_MovieGenres_B_fkey";

-- AlterTable
ALTER TABLE "public"."Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Movie" DROP CONSTRAINT "Movie_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."_MovieGenres" DROP CONSTRAINT "_MovieGenres_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_MovieGenres_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE INDEX "_MovieGenres_B_index" ON "public"."_MovieGenres"("B");

-- AddForeignKey
ALTER TABLE "public"."_MovieGenres" ADD CONSTRAINT "_MovieGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MovieGenres" ADD CONSTRAINT "_MovieGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
