-- DropForeignKey
ALTER TABLE "testimonial_tbl" DROP CONSTRAINT "testimonial_tbl_userId_fkey";

-- AddForeignKey
ALTER TABLE "testimonial_tbl" ADD CONSTRAINT "testimonial_tbl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_tbl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
