/*
  Warnings:

  - Added the required column `attractionName` to the `booking_tbl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking_tbl" ADD COLUMN     "attractionName" TEXT NOT NULL;
