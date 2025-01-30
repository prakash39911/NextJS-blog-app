-- CreateEnum
CREATE TYPE "permission" AS ENUM ('CREATE', 'EDIT', 'DELETE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "permission"[];
