-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
