/*
  Warnings:

  - Made the column `edited_at` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `edited_at` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "edited_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "edited_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" VARCHAR(255) NOT NULL;
