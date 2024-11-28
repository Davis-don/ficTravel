-- CreateTable
CREATE TABLE "booking_tbl" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "dateOfBooking" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "booking_tbl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking_tbl" ADD CONSTRAINT "booking_tbl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_tbl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
