/*
  Warnings:

  - You are about to drop the `followers_to_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `follows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts_to_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "followers_to_tags" DROP CONSTRAINT "followers_to_tags_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "followers_to_tags" DROP CONSTRAINT "followers_to_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_following_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_to_tags" DROP CONSTRAINT "posts_to_tags_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts_to_tags" DROP CONSTRAINT "posts_to_tags_tag_id_fkey";

-- DropTable
DROP TABLE "followers_to_tags";

-- DropTable
DROP TABLE "follows";

-- DropTable
DROP TABLE "posts_to_tags";

-- DropTable
DROP TABLE "tags";
