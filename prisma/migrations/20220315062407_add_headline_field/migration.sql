/*
  Warnings:

  - Added the required column `headline` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "headline" VARCHAR(1000) NOT NULL;
