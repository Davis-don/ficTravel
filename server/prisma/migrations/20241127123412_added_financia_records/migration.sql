/*
  Warnings:

  - Added the required column `bookingPrice` to the `booking_tbl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAmount` to the `booking_tbl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking_tbl" ADD COLUMN     "bookingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paidAmount" DOUBLE PRECISION NOT NULL;
