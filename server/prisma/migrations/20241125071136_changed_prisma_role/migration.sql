-- AlterTable
ALTER TABLE "booking_tbl" ADD COLUMN     "agentId" INTEGER;

-- AlterTable
ALTER TABLE "user_tbl" ALTER COLUMN "role" SET DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "booking_tbl" ADD CONSTRAINT "booking_tbl_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "user_tbl"("id") ON DELETE SET NULL ON UPDATE CASCADE;
