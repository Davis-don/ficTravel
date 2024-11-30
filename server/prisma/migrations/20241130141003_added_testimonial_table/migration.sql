-- CreateTable
CREATE TABLE "testimonial_tbl" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonial_tbl_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testimonial_tbl" ADD CONSTRAINT "testimonial_tbl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_tbl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
